import User, { ROLES } from '../models/User.js';
import Property from '../models/Property.js';
import Activity from '../models/Activity.js';

// Helper to log platform activity
const logActivity = async ({ actor, actorName, actorRole, action, targetType, details, ipAddress }) => {
  try {
    await Activity.create({
      actor,
      actorName: actorName || 'System',
      actorRole: actorRole || 'super_admin',
      action,
      targetType: targetType || 'SYSTEM',
      details,
      ipAddress: ipAddress || '',
    });
  } catch (err) {
    console.error('Failed to record activity log:', err.message);
  }
};

/**
 * GET /api/super-admin/dashboard
 * Aggregated KPIs for the Executive Dashboard
 */
export const getDashboardOverview = async (req, res, next) => {
  try {
    // 1. User stats by role
    const usersByRole = await User.aggregate([
      {
        $group: {
          _id: '$role',
          count: { $sum: 1 },
          active: { $sum: { $cond: [{ $eq: ['$isActive', true] }, 1, 0] } },
        },
      },
    ]);

    const roleStats = {
      super_admin: 0,
      admin: 0,
      rm: 0,
      agent: 0,
      customer: 0,
      totalUsers: 0,
      totalActiveUsers: 0,
    };

    usersByRole.forEach((r) => {
      if (roleStats[r._id] !== undefined) {
        roleStats[r._id] = r.count;
      }
      roleStats.totalUsers += r.count;
      roleStats.totalActiveUsers += r.active;
    });

    // 2. Property & Plot stats
    const properties = await Property.find({}).lean();
    const totalLands = properties.length;
    let totalPlots = 0;
    let availablePlots = 0;
    let bookedPlots = 0;
    let soldPlots = 0;

    properties.forEach((p) => {
      if (Array.isArray(p.plots)) {
        p.plots.forEach((plot) => {
          totalPlots += 1;
          const status = (plot.status || 'available').toLowerCase();
          if (status === 'available') availablePlots += 1;
          else if (status === 'booked') bookedPlots += 1;
          else if (status === 'sold') soldPlots += 1;
        });
      }
    });

    // 3. Recent 5 activities
    const recentActivities = await Activity.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();

    return res.status(200).json({
      success: true,
      data: {
        users: roleStats,
        inventory: {
          totalLands,
          totalPlots,
          availablePlots,
          bookedPlots,
          soldPlots,
        },
        recentActivities,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/super-admin/users
 * List all users with filtering, search & pagination
 */
export const getAllUsers = async (req, res, next) => {
  try {
    const { role, search, status, page = 1, limit = 20 } = req.query;

    const query = {};

    if (role && ROLES.includes(role.toLowerCase())) {
      query.role = role.toLowerCase();
    }

    if (status !== undefined) {
      if (status === 'active') query.isActive = true;
      if (status === 'inactive') query.isActive = false;
    }

    if (search && search.trim()) {
      const term = search.trim();
      const regex = new RegExp(term, 'i');
      query.$or = [{ name: regex }, { email: regex }, { phone: regex }];
    }

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password')
        .populate('assignedRM', 'name email phone')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      User.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: users,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parsedLimit,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/super-admin/users
 * Super Admin creates a new Admin, RM, Agent or Customer
 */
export const createUser = async (req, res, next) => {
  try {
    const { name, email, phone, password, role, assignedRM } = req.body;

    if (!name || !email || !phone || !password || !role) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, password, and role are required.',
      });
    }

    const targetRole = role.toLowerCase().trim();
    if (!ROLES.includes(targetRole)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role specified. Allowed roles: ${ROLES.join(', ')}`,
      });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
    });

    if (existing) {
      const field = existing.email === email.toLowerCase().trim() ? 'Email' : 'Phone number';
      return res.status(400).json({
        success: false,
        message: `${field} is already registered.`,
      });
    }

    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: targetRole,
      assignedRM: targetRole === 'agent' && assignedRM ? assignedRM : null,
    });

    // Log the event
    await logActivity({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: 'USER_CREATED',
      targetType: 'USER',
      details: `Created new ${targetRole.toUpperCase()} user "${newUser.name}" (${newUser.phone}).`,
      ipAddress: req.ip,
    });

    return res.status(201).json({
      success: true,
      message: `${targetRole.toUpperCase()} account created successfully.`,
      data: newUser.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/super-admin/users/:id/status
 * Activate or Deactivate (Block) an account
 */
export const updateUserStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body;

    if (typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: 'isActive boolean value is required.',
      });
    }

    // Safety: prevent self-lockout
    if (String(req.user._id) === String(id)) {
      return res.status(400).json({
        success: false,
        message: 'Super Admin cannot deactivate their own active account.',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    user.isActive = isActive;
    await user.save();

    await logActivity({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: isActive ? 'USER_ACTIVATED' : 'USER_DEACTIVATED',
      targetType: 'USER',
      details: `${isActive ? 'Activated' : 'Deactivated'} account of ${user.name} (${user.role}).`,
      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: `User account has been ${isActive ? 'activated' : 'deactivated'}.`,
      data: user.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE /api/super-admin/users/:id
 * Permanently remove a user account
 */
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (String(req.user._id) === String(id)) {
      return res.status(400).json({
        success: false,
        message: 'Super Admin cannot delete their own active account.',
      });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    await User.findByIdAndDelete(id);

    await logActivity({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: 'USER_DELETED',
      targetType: 'USER',
      details: `Permanently removed ${user.role.toUpperCase()} account "${user.name}" (${user.email}).`,
      ipAddress: req.ip,
    });

    return res.status(200).json({
      success: true,
      message: `User "${user.name}" has been permanently deleted.`,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/super-admin/activities
 * Fetch activity audit logs
 */
export const getActivityLogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 30 } = req.query;
    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const [activities, total] = await Promise.all([
      Activity.find({})
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Activity.countDocuments({}),
    ]);

    return res.status(200).json({
      success: true,
      data: activities,
      pagination: {
        total,
        page: parseInt(page, 10),
        limit: parsedLimit,
        pages: Math.ceil(total / parsedLimit),
      },
    });
  } catch (error) {
    next(error);
  }
};


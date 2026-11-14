import User from '../models/User.js';
import Property from '../models/Property.js';
import Booking from '../models/Booking.js';
import Activity from '../models/Activity.js';

/**
 * GET /api/admin/dashboard
 * High-level operational summary for Admin Console
 */
export const getAdminDashboard = async (req, res, next) => {
  try {
    const [totalRMs, totalAgents, totalLands, pendingBookings, salesAggregate] = await Promise.all([
      User.countDocuments({ role: 'rm' }),
      User.countDocuments({ role: 'agent' }),
      Property.countDocuments({}),
      Booking.countDocuments({ status: 'pending_admin' }),
      Booking.aggregate([
        { $match: { status: { $in: ['approved', 'registry_done'] } } },
        { $group: { _id: null, totalSales: { $sum: '$tokenAmount' }, totalPlotsSold: { $sum: 1 } } },
      ]),
    ]);

    const salesStats = salesAggregate[0] || { totalSales: 0, totalPlotsSold: 0 };

    return res.status(200).json({
      success: true,
      data: {
        totalRMs,
        totalAgents,
        totalLands,
        pendingBookings,
        totalSalesVolume: salesStats.totalSales,
        totalPlotsSold: salesStats.totalPlotsSold,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/team
 * List all RMs and their assigned Agents
 */
export const getAdminTeam = async (req, res, next) => {
  try {
    const [rms, agents] = await Promise.all([
      User.find({ role: 'rm' }).select('-password').sort({ name: 1 }).lean(),
      User.find({ role: 'agent' }).select('-password').populate('assignedRM', 'name phone email').sort({ name: 1 }).lean(),
    ]);

    // Group agents by their assigned RM
    const teamHierarchy = rms.map((rm) => {
      const assignedAgents = agents.filter(
        (ag) => ag.assignedRM && String(ag.assignedRM._id) === String(rm._id)
      );
      return {
        ...rm,
        agentsCount: assignedAgents.length,
        agents: assignedAgents,
      };
    });

    // Unassigned agents (agents who don't have an RM yet)
    const unassignedAgents = agents.filter((ag) => !ag.assignedRM);

    return res.status(200).json({
      success: true,
      data: {
        rms: teamHierarchy,
        unassignedAgents,
        totalAgents: agents.length,
        totalRMs: rms.length,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/admin/team/rm
 * Onboard a new Relationship Manager (RM)
 */
export const createRM = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and password are required.',
      });
    }

    const existing = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }],
    });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Email or phone number is already registered.',
      });
    }

    const newRM = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: 'rm',
    });

    await Activity.create({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: 'RM_CREATED',
      targetType: 'USER',
      details: `Admin ${req.user.name} onboarded new RM "${newRM.name}" (${newRM.phone}).`,
      ipAddress: req.ip || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Relationship Manager created successfully.',
      data: newRM.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/admin/bookings
 * List all plot bookings with status filters
 */
export const getAllBookings = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const query = {};

    if (status) {
      query.status = status;
    }

    const skip = (Math.max(1, parseInt(page, 10)) - 1) * parseInt(limit, 10);
    const parsedLimit = Math.min(100, Math.max(1, parseInt(limit, 10)));

    const [bookings, total] = await Promise.all([
      Booking.find(query)
        .populate('agent', 'name phone email')
        .populate('rm', 'name phone email')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(parsedLimit)
        .lean(),
      Booking.countDocuments(query),
    ]);

    return res.status(200).json({
      success: true,
      data: bookings,
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
 * PATCH /api/admin/bookings/:id/status
 * Admin approves booking or confirms registry completion
 */
export const updateBookingStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, registryDate, notes } = req.body;

    const validStatuses = ['approved', 'rejected', 'registry_done'];
    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(', ')}`,
      });
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    booking.status = status;
    if (notes) booking.notes = notes;
    if (status === 'registry_done') {
      booking.registryDate = registryDate ? new Date(registryDate) : new Date();
    }

    // Calculate commission if total price exists
    if (booking.totalPrice > 0 && booking.commissionPercentage > 0) {
      booking.commissionAmount = Math.round(
        (booking.totalPrice * booking.commissionPercentage) / 100
      );
    }

    await booking.save();

    // Sync plot status in Property model
    try {
      const property = await Property.findOne({ land: Number(booking.landId) });
      if (property && Array.isArray(property.plots)) {
        const plot = property.plots.find((p) => p.plot_id === booking.plotId);
        if (plot) {
          if (status === 'approved') {
            plot.status = 'booked';
            plot.booking_id = String(booking._id);
          } else if (status === 'registry_done') {
            plot.status = 'sold';
            plot.booking_id = String(booking._id);
          } else if (status === 'rejected') {
            plot.status = 'available';
            plot.booking_id = null;
          }
          await property.save();
        }
      }
    } catch (err) {
      console.error('Error synchronizing plot status in property model:', err.message);
    }

    await Activity.create({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: `BOOKING_${status.toUpperCase()}`,
      targetType: 'PLOT',
      details: `Admin ${req.user.name} marked booking for plot "${booking.plotId}" (Land #${booking.landId}) as ${status}.`,
      ipAddress: req.ip || '',
    });

    return res.status(200).json({
      success: true,
      message: `Booking has been updated to "${status}".`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};


import User from '../models/User.js';
import CustomerLead from '../models/CustomerLead.js';
import SiteVisit from '../models/SiteVisit.js';
import Booking from '../models/Booking.js';
import Activity from '../models/Activity.js';

/**
 * GET /api/rm/dashboard
 * RM operational metrics
 */
export const getRMDashboard = async (req, res, next) => {
  try {
    const rmId = req.user._id;

    // Find all agents under this RM
    const agents = await User.find({ role: 'agent', assignedRM: rmId }).select('_id');
    const agentIds = agents.map((a) => a._id);

    const [totalAgents, totalLeads, pendingVisits, pendingBookings] = await Promise.all([
      agents.length,
      CustomerLead.countDocuments({
        $or: [{ assignedRM: rmId }, { assignedAgent: { $in: agentIds } }],
      }),
      SiteVisit.countDocuments({
        $or: [{ rm: rmId }, { agent: { $in: agentIds } }],
        status: { $in: ['pending', 'confirmed'] },
      }),
      Booking.countDocuments({
        $or: [{ rm: rmId }, { agent: { $in: agentIds } }],
        status: 'pending_rm',
      }),
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalAgents,
        totalLeads,
        pendingVisits,
        pendingBookings,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rm/agents
 * List all agents managed by this RM
 */
export const getRMAgents = async (req, res, next) => {
  try {
    const rmId = req.user._id;
    const agents = await User.find({ role: 'agent', assignedRM: rmId })
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: agents,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * POST /api/rm/agents
 * RM directly onboards an Agent under their command
 */
export const createAgent = async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;
    const rmId = req.user._id;

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

    const newAgent = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: 'agent',
      assignedRM: rmId,
    });

    await Activity.create({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: 'AGENT_CREATED',
      targetType: 'USER',
      details: `RM ${req.user.name} onboarded new Agent "${newAgent.name}" (${newAgent.phone}).`,
      ipAddress: req.ip || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Agent created and tagged to your team.',
      data: newAgent.toSafeObject(),
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rm/customers
 * Leads pipeline for this RM's assigned agents
 */
export const getRMCustomers = async (req, res, next) => {
  try {
    const rmId = req.user._id;
    const agents = await User.find({ role: 'agent', assignedRM: rmId }).select('_id');
    const agentIds = agents.map((a) => a._id);

    const leads = await CustomerLead.find({
      $or: [{ assignedRM: rmId }, { assignedAgent: { $in: agentIds } }],
    })
      .populate('assignedAgent', 'name phone email')
      .sort({ updatedAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: leads,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rm/visits
 * Site visits scheduled across this RM's team
 */
export const getRMVisits = async (req, res, next) => {
  try {
    const rmId = req.user._id;
    const agents = await User.find({ role: 'agent', assignedRM: rmId }).select('_id');
    const agentIds = agents.map((a) => a._id);

    const visits = await SiteVisit.find({
      $or: [{ rm: rmId }, { agent: { $in: agentIds } }],
    })
      .populate('agent', 'name phone')
      .populate('customer', 'name phone budget')
      .sort({ visitDate: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: visits,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/rm/visits/:id
 * RM assigns driver/cab or marks visit completed
 */
export const updateVisitStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, driverName, driverPhone, remarks } = req.body;

    const visit = await SiteVisit.findById(id);
    if (!visit) {
      return res.status(404).json({
        success: false,
        message: 'Site visit not found.',
      });
    }

    if (status) visit.status = status;
    if (driverName !== undefined) visit.driverName = driverName;
    if (driverPhone !== undefined) visit.driverPhone = driverPhone;
    if (remarks !== undefined) visit.remarks = remarks;

    await visit.save();

    return res.status(200).json({
      success: true,
      message: 'Site visit details updated successfully.',
      data: visit,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/rm/bookings
 * Bookings submitted by agents in this RM's team
 */
export const getRMBookings = async (req, res, next) => {
  try {
    const rmId = req.user._id;
    const agents = await User.find({ role: 'agent', assignedRM: rmId }).select('_id');
    const agentIds = agents.map((a) => a._id);

    const bookings = await Booking.find({
      $or: [{ rm: rmId }, { agent: { $in: agentIds } }],
    })
      .populate('agent', 'name phone email')
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      success: true,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/rm/bookings/:id/review
 * RM approves and escalates booking to Admin tier
 */
export const reviewBooking = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { action, notes } = req.body; // 'forward_to_admin' or 'reject'

    const booking = await Booking.findById(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    if (action === 'forward_to_admin') {
      booking.status = 'pending_admin';
    } else if (action === 'reject') {
      booking.status = 'rejected';
    } else {
      return res.status(400).json({
        success: false,
        message: 'Action must be "forward_to_admin" or "reject".',
      });
    }

    if (notes) booking.notes = notes;
    await booking.save();

    await Activity.create({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: action === 'forward_to_admin' ? 'BOOKING_ESCALATED' : 'BOOKING_REJECTED',
      targetType: 'PLOT',
      details: `RM ${req.user.name} reviewed booking for plot ${booking.plotId} (${action}).`,
      ipAddress: req.ip || '',
    });

    return res.status(200).json({
      success: true,
      message: `Booking has been ${action === 'forward_to_admin' ? 'forwarded to Admin for approval' : 'rejected'}.`,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/rm/customers/:id
 * RM updates lead status (e.g. contacted, visit_scheduled, booked, lost) and notes after contacting customer
 */
export const updateCustomerLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const lead = await CustomerLead.findById(id);
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Customer lead not found.',
      });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    await lead.save();

    await Activity.create({
      actor: req.user._id,
      actorName: req.user.name,
      actorRole: req.user.role,
      action: 'LEAD_UPDATED',
      targetType: 'LEAD',
      details: `RM ${req.user.name} contacted lead "${lead.name}" (${lead.phone}) and updated status to "${lead.status}".`,
      ipAddress: req.ip || '',
    });

    return res.status(200).json({
      success: true,
      message: 'Lead contact status and notes updated successfully.',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};



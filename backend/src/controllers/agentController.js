import CustomerLead from '../models/CustomerLead.js';
import SiteVisit from '../models/SiteVisit.js';
import Booking from '../models/Booking.js';
import Property from '../models/Property.js';

/**
 * GET /api/agent/dashboard
 * Agent personal performance & commission summary
 */
export const getAgentDashboard = async (req, res, next) => {
  try {
    const agentId = req.user._id;

    const [totalLeads, totalVisits, bookingsAggregate] = await Promise.all([
      CustomerLead.countDocuments({ assignedAgent: agentId }),
      SiteVisit.countDocuments({ agent: agentId }),
      Booking.aggregate([
        { $match: { agent: agentId } },
        {
          $group: {
            _id: null,
            totalBookings: { $sum: 1 },
            approvedBookings: {
              $sum: {
                $cond: [{ $in: ['$status', ['approved', 'registry_done']] }, 1, 0],
              },
            },
            totalCommission: {
              $sum: {
                $cond: [{ $in: ['$status', ['approved', 'registry_done']] }, '$commissionAmount', 0],
              },
            },
          },
        },
      ]),
    ]);

    const stats = bookingsAggregate[0] || {
      totalBookings: 0,
      approvedBookings: 0,
      totalCommission: 0,
    };

    return res.status(200).json({
      success: true,
      data: {
        totalLeads,
        totalVisits,
        totalBookings: stats.totalBookings,
        approvedBookings: stats.approvedBookings,
        totalCommissionEarned: stats.totalCommission,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/agent/customers
 * List this agent's customer leads
 */
export const getAgentCustomers = async (req, res, next) => {
  try {
    const agentId = req.user._id;
    const leads = await CustomerLead.find({ assignedAgent: agentId })
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
 * POST /api/agent/customers
 * Add a new customer lead
 */
export const createCustomerLead = async (req, res, next) => {
  try {
    const { name, phone, email, budget, preferredLocation, interestedLand, notes } = req.body;
    const agentId = req.user._id;
    const rmId = req.user.assignedRM || null;

    if (!name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Customer name and phone number are required.',
      });
    }

    const newLead = await CustomerLead.create({
      name: name.trim(),
      phone: phone.trim(),
      email: email ? email.trim() : '',
      budget: budget || '',
      preferredLocation: preferredLocation || '',
      interestedLand: interestedLand ? Number(interestedLand) : null,
      assignedAgent: agentId,
      assignedRM: rmId,
      status: 'new',
      notes: notes || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Customer lead saved successfully.',
      data: newLead,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * PATCH /api/agent/customers/:id
 * Update customer status or add remarks
 */
export const updateCustomerLead = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, notes, budget, preferredLocation } = req.body;
    const agentId = req.user._id;

    const lead = await CustomerLead.findOne({ _id: id, assignedAgent: agentId });
    if (!lead) {
      return res.status(404).json({
        success: false,
        message: 'Customer lead not found.',
      });
    }

    if (status) lead.status = status;
    if (notes !== undefined) lead.notes = notes;
    if (budget !== undefined) lead.budget = budget;
    if (preferredLocation !== undefined) lead.preferredLocation = preferredLocation;

    await lead.save();

    return res.status(200).json({
      success: true,
      message: 'Lead updated successfully.',
      data: lead,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/agent/visits
 * List site visits scheduled by this agent
 */
export const getAgentVisits = async (req, res, next) => {
  try {
    const agentId = req.user._id;
    const visits = await SiteVisit.find({ agent: agentId })
      .populate('customer', 'name phone')
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
 * POST /api/agent/visits
 * Book free cab / site visit for a client to inspect land
 */
export const requestSiteVisit = async (req, res, next) => {
  try {
    const { customerId, landId, siteName, visitDate, pickupAddress, cabRequired, remarks } = req.body;
    const agentId = req.user._id;
    const rmId = req.user.assignedRM || null;

    if (!customerId || !landId || !siteName || !visitDate || !pickupAddress) {
      return res.status(400).json({
        success: false,
        message: 'Customer, Land project, visit date, and pickup address are required.',
      });
    }

    const customer = await CustomerLead.findById(customerId);
    if (!customer) {
      return res.status(404).json({
        success: false,
        message: 'Customer record not found.',
      });
    }

    const newVisit = await SiteVisit.create({
      customer: customer._id,
      customerName: customer.name,
      customerPhone: customer.phone,
      landId: Number(landId),
      siteName: siteName.trim(),
      agent: agentId,
      rm: rmId,
      visitDate: new Date(visitDate),
      pickupAddress: pickupAddress.trim(),
      cabRequired: cabRequired !== false,
      status: 'pending',
      remarks: remarks || '',
    });

    // Update lead status
    customer.status = 'visit_scheduled';
    await customer.save();

    return res.status(201).json({
      success: true,
      message: 'Site visit request registered. Free cab dispatched upon RM confirmation.',
      data: newVisit,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * GET /api/agent/bookings
 * List plot bookings originated by this agent
 */
export const getAgentBookings = async (req, res, next) => {
  try {
    const agentId = req.user._id;
    const bookings = await Booking.find({ agent: agentId })
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
 * POST /api/agent/bookings
 * Submit a plot booking request
 */
export const createBookingRequest = async (req, res, next) => {
  try {
    const {
      landId,
      siteName,
      plotId,
      customerId,
      customerName,
      customerPhone,
      tokenAmount,
      totalPrice,
      paymentMode,
      transactionRef,
      notes,
    } = req.body;

    const agentId = req.user._id;
    const rmId = req.user.assignedRM || null;

    if (!landId || !siteName || !plotId || !tokenAmount || !customerName || !customerPhone) {
      return res.status(400).json({
        success: false,
        message: 'Land ID, site name, plot ID, token amount, and customer details are required.',
      });
    }

    const newBooking = await Booking.create({
      landId: Number(landId),
      siteName: siteName.trim(),
      plotId: plotId.trim(),
      customer: customerId || null,
      customerName: customerName.trim(),
      customerPhone: customerPhone.trim(),
      agent: agentId,
      rm: rmId,
      tokenAmount: Number(tokenAmount),
      totalPrice: totalPrice ? Number(totalPrice) : 0,
      paymentMode: paymentMode || 'UPI',
      transactionRef: transactionRef ? transactionRef.trim() : '',
      status: 'pending_rm',
      commissionPercentage: 5,
      commissionAmount: totalPrice ? Math.round((Number(totalPrice) * 5) / 100) : 0,
      notes: notes || '',
    });

    return res.status(201).json({
      success: true,
      message: 'Plot booking request submitted for RM review.',
      data: newBooking,
    });
  } catch (error) {
    next(error);
  }
};


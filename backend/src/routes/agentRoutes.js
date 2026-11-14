import express from 'express';
import {
  getAgentDashboard,
  getAgentCustomers,
  createCustomerLead,
  updateCustomerLead,
  getAgentVisits,
  requestSiteVisit,
  getAgentBookings,
  createBookingRequest,
} from '../controllers/agentController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Enforce Auth and Agent tier (Admin & Super Admin also have access)
router.use(protect, authorizeRoles('super_admin', 'admin', 'rm', 'agent'));

// Performance Dashboard
router.get('/dashboard', getAgentDashboard);

// Customer Leads CRM
router.get('/customers', getAgentCustomers);
router.post('/customers', createCustomerLead);
router.patch('/customers/:id', updateCustomerLead);

// Free Site Visits Request
router.get('/visits', getAgentVisits);
router.post('/visits', requestSiteVisit);

// Plot Bookings
router.get('/bookings', getAgentBookings);
router.post('/bookings', createBookingRequest);

export default router;


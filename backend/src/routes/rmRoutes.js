import express from 'express';
import {
  getRMDashboard,
  getRMAgents,
  createAgent,
  getRMCustomers,
  getRMVisits,
  updateVisitStatus,
  getRMBookings,
  reviewBooking,
  updateCustomerLead,
} from '../controllers/rmController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Enforce Auth and RM tier (Admin & Super Admin also have access)
router.use(protect, authorizeRoles('super_admin', 'admin', 'rm'));

// Dashboard KPIs
router.get('/dashboard', getRMDashboard);

// Managed Agents
router.get('/agents', getRMAgents);
router.post('/agents', createAgent);

// Customer Leads
router.get('/customers', getRMCustomers);
router.patch('/customers/:id', updateCustomerLead);

// Site Visits & Cab Dispatch
router.get('/visits', getRMVisits);
router.patch('/visits/:id', updateVisitStatus);

// Plot Bookings Verification
router.get('/bookings', getRMBookings);
router.patch('/bookings/:id/review', reviewBooking);

export default router;


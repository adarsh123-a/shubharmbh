import express from 'express';
import {
  getAdminDashboard,
  getAdminTeam,
  createRM,
  getAllBookings,
  updateBookingStatus,
} from '../controllers/adminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Enforce Auth and Admin/Super-Admin tier
router.use(protect, authorizeRoles('super_admin', 'admin'));

// Dashboard Stats
router.get('/dashboard', getAdminDashboard);

// Team & Hierarchy
router.get('/team', getAdminTeam);
router.post('/team/rm', createRM);

// Bookings & Registry Management
router.get('/bookings', getAllBookings);
router.patch('/bookings/:id/status', updateBookingStatus);

export default router;


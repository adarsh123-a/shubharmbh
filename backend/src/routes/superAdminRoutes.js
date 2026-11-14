import express from 'express';
import {
  getDashboardOverview,
  getAllUsers,
  createUser,
  updateUserStatus,
  deleteUser,
  getActivityLogs,
} from '../controllers/superAdminController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Enforce authentication & Super Admin role authorization on all routes
router.use(protect, authorizeRoles('super_admin'));

// Executive Dashboard Stats
router.get('/dashboard', getDashboardOverview);

// User Management (Admin, RM, Agent, Customer)
router.get('/users', getAllUsers);
router.post('/users', createUser);
router.patch('/users/:id/status', updateUserStatus);
router.delete('/users/:id', deleteUser);

// Platform Activity Audit Logs
router.get('/activities', getActivityLogs);

export default router;


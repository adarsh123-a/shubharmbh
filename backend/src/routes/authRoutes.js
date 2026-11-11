import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updatePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Optional auth helper to check if caller is logged in (used during provision of elevated roles)
const optionalProtect = async (req, res, next) => {
  if (
    (req.cookies && req.cookies.token) ||
    (req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
  ) {
    return protect(req, res, next);
  }
  next();
};

// Public & Session routes
router.post('/register', optionalProtect, register);
router.post('/login', login);
router.post('/logout', logout);

// Authenticated user profile routes
router.get('/me', protect, getMe);
router.put('/update-password', protect, updatePassword);

// Role-Gate Verification endpoints (multi-level RBAC verification)
router.get(
  '/role-check/super-admin',
  protect,
  authorizeRoles('super_admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Access granted: Super Admin level authorized.',
      user: req.user
    });
  }
);

router.get(
  '/role-check/admin',
  protect,
  authorizeRoles('super_admin', 'admin'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Access granted: Admin tier authorized.',
      user: req.user
    });
  }
);

router.get(
  '/role-check/rm',
  protect,
  authorizeRoles('super_admin', 'admin', 'rm'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Access granted: Relationship Manager tier authorized.',
      user: req.user
    });
  }
);

router.get(
  '/role-check/agent',
  protect,
  authorizeRoles('super_admin', 'admin', 'agent'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Access granted: Agent tier authorized.',
      user: req.user
    });
  }
);

router.get(
  '/role-check/customer',
  protect,
  authorizeRoles('customer'),
  (req, res) => {
    res.json({
      success: true,
      message: 'Access granted: Customer tier authorized.',
      user: req.user
    });
  }
);

export default router;


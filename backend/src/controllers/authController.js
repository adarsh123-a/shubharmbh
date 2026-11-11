import User, { ROLES } from '../models/User.js';
import { sendTokenResponse, clearTokenResponse } from '../utils/token.js';

export const register = async (req, res, next) => {
  try {
    const { name, email, phone, password, role } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, phone, and password are required.'
      });
    }

    let targetRole = role ? role.toLowerCase() : 'customer';

    if (!ROLES.includes(targetRole)) {
      return res.status(400).json({
        success: false,
        message: `Invalid role specified. Valid roles are: ${ROLES.join(', ')}`
      });
    }

    // Security Gate: Restrict super_admin and elevated roles
    if (targetRole === 'super_admin') {
      return res.status(403).json({
        success: false,
        message: 'Super Admin registration is disabled. Please sign in directly with administrator credentials.'
      });
    }

    if (['admin', 'rm'].includes(targetRole)) {
      const userCount = await User.countDocuments();
      const isInitialBootstrap = userCount === 0;

      // Allow initial setup if DB is empty; otherwise require logged-in super_admin
      if (!isInitialBootstrap) {
        const caller = req.user;
        if (!caller || caller.role !== 'super_admin') {
          return res.status(403).json({
            success: false,
            message: `Public registration cannot create '${targetRole}' accounts. Only Super Admin can provision elevated roles.`
          });
        }
      }
    }

    const existingUser = await User.findOne({
      $or: [{ email: email.toLowerCase().trim() }, { phone: phone.trim() }]
    });

    if (existingUser) {
      const duplicateField =
        existingUser.email === email.toLowerCase().trim() ? 'Email' : 'Phone number';
      return res.status(400).json({
        success: false,
        message: `${duplicateField} is already registered.`
      });
    }

    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone.trim(),
      password,
      role: targetRole
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email or phone and password.'
      });
    }

    const cleanIdentifier = identifier.trim();
    const user = await User.findOne({
      $or: [
        { email: cleanIdentifier.toLowerCase() },
        { phone: cleanIdentifier }
      ]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Account is deactivated. Contact system administrator.'
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials.'
      });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res) => {
  clearTokenResponse(res);
  res.status(200).json({
    success: true,
    message: 'User logged out successfully.'
  });
};

export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user
  });
};

export const updatePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required.'
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'New password must be at least 6 characters long.'
      });
    }

    const user = await User.findById(req.user._id).select('+password');

    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect.'
      });
    }

    user.password = newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};


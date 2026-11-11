import React, { useState } from 'react';
import './styles/login.css';
import { authService } from './services/authService.js';

const ROLES = [
  { id: 'customer', label: 'Customer', badge: 'Customer' },
  { id: 'agent', label: 'Agent', badge: 'Agent' },
  { id: 'rm', label: 'RM', badge: 'RM' },
  { id: 'admin', label: 'Admin', badge: 'Admin' },
  { id: 'super_admin', label: 'Super Admin', badge: 'Super Admin' }
];

export default function LoginApp() {
  const [mode, setMode] = useState('login'); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('customer');

  // Form states
  const [identifier, setIdentifier] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrorMessage('');
    setSuccessMessage('');
    if (roleId === 'super_admin') {
      setMode('login');
      setIdentifier('superadmin@shubharambhrealty.com');
      setPassword('12345');
    } else {
      if (identifier === 'superadmin@shubharambhrealty.com') {
        setIdentifier('');
        setPassword('');
      }
    }
  };

  const navigateByRole = (role) => {
    // Sync cookie for client-side routing
    document.cookie = `user_role=${role}; path=/; max-age=604800; SameSite=Lax`;

    const roleMap = {
      super_admin: '/super-admin',
      admin: '/admin',
      rm: '/rm',
      agent: '/agent',
      customer: '/'
    };

    const target = roleMap[role] || '/';
    window.location.href = target;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await authService.login(identifier, password);
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => {
        navigateByRole(response.user.role);
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsLoading(true);

    try {
      const response = await authService.register({
        name,
        email,
        phone,
        password,
        role: selectedRole
      });
      setSuccessMessage(`Account created as ${response.user.role}! Redirecting...`);
      setTimeout(() => {
        navigateByRole(response.user.role);
      }, 700);
    } catch (err) {
      setErrorMessage(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      <div className="login-card">
        {/* Brand Header */}
        <div className="login-brand-header">
          <h1 className="login-brand-title">Shubharambh Realty</h1>
          <p className="login-brand-tagline">
            Find Your Dream Property — Buy, Invest & Build Your Future
          </p>
          <span className="login-powered-by">Powered by eformx</span>
        </div>

        {/* Role Pills */}
        <div className="role-selector-container">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              className={`role-pill ${selectedRole === r.id ? `active-${r.id}` : ''}`}
              onClick={() => handleRoleSelect(r.id)}
            >
              {r.label}
            </button>
          ))}
        </div>

        {/* Mode Tabs */}
        {selectedRole !== 'super_admin' ? (
          <div className="auth-mode-tabs">
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
              onClick={() => {
                setMode('login');
                setErrorMessage('');
                setSuccessMessage('');
              }}
            >
              Sign In
            </button>
            <button
              type="button"
              className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
              onClick={() => {
                setMode('register');
                setErrorMessage('');
                setSuccessMessage('');
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '11.5px', fontWeight: '700', color: '#B45309', background: '#FEF3C7', padding: '5px 12px', borderRadius: '8px', display: 'inline-block' }}>
              👑 Super Admin Direct Login
            </span>
          </div>
        )}

        {/* Feedback Alerts */}
        {errorMessage && (
          <div className="auth-alert auth-alert-error">{errorMessage}</div>
        )}
        {successMessage && (
          <div className="auth-alert auth-alert-success">{successMessage}</div>
        )}

        {/* Auth Forms */}
        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">Email or Phone Number</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g. rajesh@example.com or 9876543210"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Signing In...' : `Sign In as ${selectedRole.replace('_', ' ').toUpperCase()}`}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                className="form-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-input"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="form-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-input"
                  placeholder="Minimum 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="toggle-pwd-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-btn"
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : `Register as ${selectedRole.replace('_', ' ').toUpperCase()}`}
            </button>
          </form>
        )}

        {/* Footer Support */}
        <div className="auth-footer-help">
          Need assistance? Helpline:{' '}
          <a href="tel:+917275004901" className="auth-footer-link">
            +91 7275004901
          </a>
        </div>
      </div>
    </div>
  );
}


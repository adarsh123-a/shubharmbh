import React, { useState } from 'react';
import './styles/login.css';
import { authService } from './services/authService.js';

const ROLES = [
  { id: 'customer', label: 'Customer', badge: 'Customer' },
  { id: 'agent', label: 'Agent', badge: 'Agent' },
  { id: 'rm', label: 'RM', badge: 'RM' },
  { id: 'admin', label: 'Admin', badge: 'Admin' },
  { id: 'super_admin', label: 'Super Admin', badge: 'Super Admin' },
];

function getInitialRole() {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const r = (params.get('role') || '').toLowerCase().trim();
    if (['customer', 'agent', 'rm', 'admin', 'super_admin'].includes(r)) {
      return r;
    }
  }
  return 'customer';
}

export default function LoginApp() {
  const initialRole = getInitialRole();
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [mode, setMode] = useState('login'); // 'login' | 'register'

  // Form states
  const [identifier, setIdentifier] = useState(
    initialRole === 'super_admin' ? 'superadmin@shubharambhrealty.com' : ''
  );
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState(initialRole === 'super_admin' ? '12345' : '');
  const [showPassword, setShowPassword] = useState(false);

  // Status states
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setErrorMessage('');
    setSuccessMessage('');

    // Strictly enforce login only for team roles
    if (roleId !== 'customer') {
      setMode('login');
    }

    if (roleId === 'super_admin') {
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
    document.cookie = `user_role=${role}; path=/; max-age=604800; SameSite=Lax`;

    const roleMap = {
      super_admin: '/super-admin',
      admin: '/admin',
      rm: '/rm',
      agent: '/agent',
      customer: '/',
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
      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }
      if (response.user) {
        localStorage.setItem('user_info', JSON.stringify(response.user));
      }
      setSuccessMessage('Login successful! Redirecting to portal...');
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
      await authService.register({
        name,
        email,
        phone,
        password,
        role: 'customer',
      });
      setSuccessMessage(
        'Registration successful! Please sign in with your credentials to access the Customer Portal.'
      );
      setMode('login');
      setIdentifier(phone || email);
      setPassword('');
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

        {/* Mode Tabs: Strictly for Customer. Team roles have direct login only */}
        {selectedRole === 'customer' ? (
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
              Customer Sign In
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
              New Customer Register
            </button>
          </div>
        ) : (
          <div style={{ textAlign: 'center', marginBottom: '14px' }}>
            <span
              style={{
                fontSize: '11.5px',
                fontWeight: '700',
                color: '#1E293B',
                background: '#F1F5F9',
                padding: '6px 14px',
                borderRadius: '8px',
                display: 'inline-block',
                border: '1px solid #CBD5E1',
              }}
            >
              🔒 {selectedRole === 'super_admin' ? 'Super Admin' : selectedRole.toUpperCase()} Direct Login (Team Access)
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
                placeholder="e.g. your email or 10-digit phone"
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
              {isLoading
                ? 'Signing In...'
                : `Sign In as ${selectedRole.replace('_', ' ').toUpperCase()}`}
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter full name (letters only)"
                value={name}
                onChange={(e) =>
                  setName(e.target.value.replace(/[^a-zA-Z\s\u0900-\u097F]/g, ''))
                }
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
                maxLength={10}
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))
                }
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
              {isLoading ? 'Creating Account...' : 'Register as Customer'}
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

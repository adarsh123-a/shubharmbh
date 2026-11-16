import React, { useState } from 'react';
import { superAdminService } from '../services/superAdminService.js';

export default function SuperAdminAddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('12345');
  const [role, setRole] = useState('Agent');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Full name is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid work email is required');
      return;
    }
    if (!phone.trim()) {
      setError('Contact phone is required');
      return;
    }

    const roleMap = {
      Admin: 'admin',
      RM: 'rm',
      Agent: 'agent',
      Customer: 'customer',
    };

    const cleanDigits = phone.replace(/\D/g, '');
    const cleanPhone = cleanDigits.length >= 10 ? cleanDigits.slice(-10) : cleanDigits;
    if (cleanPhone.length !== 10) {
      setError('Please provide a valid 10-digit mobile number');
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: cleanPhone,
      password: password.trim() || '12345',
      role: roleMap[role] || 'agent',
    };

    setIsSubmitting(true);
    setError('');

    try {
      const apiUser = await superAdminService.createUser(payload);
      if (!apiUser) {
        throw new Error('Failed to create user on server');
      }
      onAddUser(apiUser);
      setName('');
      setEmail('');
      setPhone('');
      setPassword('12345');
      setError('');
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error('API user creation error:', err);
      setError(err.message || 'User create nahi ho saka. Kripya details check karein.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="super-admin-modal-backdrop" onClick={onClose}>
      <div className="super-admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="super-admin-modal-header">
          <div>
            <h3>Add Enterprise Account</h3>
            <p>Provision credentials for Admin, RM, Agent or Customer</p>
          </div>
          <button
            type="button"
            className="super-admin-drawer-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="super-admin-modal-body">
            {error && (
              <div
                style={{
                  backgroundColor: '#FEE2E2',
                  border: '1px solid #FCA5A5',
                  color: '#B91C1C',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '11.5px',
                  fontWeight: '600',
                }}
              >
                ⚠️ {error}
              </div>
            )}

            <div className="super-admin-form-group">
              <label className="super-admin-form-label">Full Name *</label>
              <input
                type="text"
                className="super-admin-form-input"
                placeholder="e.g. Adarsh Tripathi (letters only)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value.replace(/[^a-zA-Z\s\u0900-\u097F]/g, ''));
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="super-admin-form-group">
              <label className="super-admin-form-label">Work Email *</label>
              <input
                type="email"
                className="super-admin-form-input"
                placeholder="name@shubharambh.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">System Role</label>
                <select
                  className="super-admin-form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Agent">Agent (Listing Partner)</option>
                  <option value="RM">RM (Relationship Manager)</option>
                  <option value="Admin">Admin (Branch Controller)</option>
                  <option value="Customer">Customer (Buyer / Investor)</option>
                </select>
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Account Status</label>
                <select
                  className="super-admin-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active</option>
                  <option value="Suspended">Suspended</option>
                </select>
              </div>
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className="super-admin-form-input"
                  placeholder="e.g. 7275004901 (10 digits)"
                  maxLength={10}
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value.replace(/\D/g, '').slice(0, 10));
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Initial Password *</label>
                <input
                  type="text"
                  className="super-admin-form-input"
                  placeholder="e.g. 12345"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="super-admin-modal-footer">
            <button
              type="button"
              className="super-admin-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="super-admin-btn-primary"
            >
              <span>+ Provision Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


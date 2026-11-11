import React, { useState } from 'react';

export default function SuperAdminAddUserModal({ isOpen, onClose, onAddUser }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Agent');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
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

    const roleColors = {
      Admin: { bg: '#F3E8FF', color: '#9333EA' },
      RM: { bg: '#E0F2FE', color: '#0284C7' },
      Agent: { bg: '#FFE4E6', color: '#E11D48' },
      Customer: { bg: '#FFEDD5', color: '#EA580C' },
    };

    const newUser = {
      id: `usr-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91${phone.trim()}`,
      role: role,
      roleBg: roleColors[role]?.bg || '#E0F2FE',
      roleColor: roleColors[role]?.color || '#0284C7',
      status: status,
      statusBg: status === 'Active' ? '#DCFCE7' : '#F1F5F9',
      statusColor: status === 'Active' ? '#16A34A' : '#64748B',
    };

    onAddUser(newUser);
    setName('');
    setEmail('');
    setPhone('');
    setError('');
    onClose();
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
                placeholder="e.g. Adarsh Tripathi"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
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

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Mobile Number *</label>
                <input
                  type="tel"
                  className="super-admin-form-input"
                  placeholder="e.g. 7275004901"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
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


import React, { useState } from 'react';
import { adminService } from '../services/adminService.js';

export default function AdminAddRMModal({ isOpen, onClose, onAddRM }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('12345');
  const [territory, setTerritory] = useState('Gomti Nagar, Lucknow');
  const [status, setStatus] = useState('Active');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('RM Name is required');
      return;
    }
    if (!phone.trim()) {
      setError('Contact phone is required');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Valid work email is required');
      return;
    }

    const cleanPhone = phone.trim().replace(/^\+91/, '');
    const payload = {
      name: name.trim(),
      phone: cleanPhone,
      email: email.trim().toLowerCase(),
      password: password.trim() || '12345',
    };

    setIsSubmitting(true);
    let createdId = `rm-${Date.now()}`;

    try {
      const created = await adminService.createRM(payload);
      if (created && created._id) {
        createdId = created._id;
      }
    } catch (err) {
      console.warn('API RM creation fallback:', err.message);
      if (err.message && (err.message.includes('already registered') || err.message.includes('required'))) {
        setError(err.message);
        setIsSubmitting(false);
        return;
      }
    }

    const newRM = {
      id: createdId,
      name: name.trim(),
      phone: `+91 ${cleanPhone}`,
      email: email.trim(),
      territory: territory.trim() || 'Lucknow Cluster',
      activeLeads: 0,
      visitsCount: 0,
      status: status,
      statusBg: status === 'Active' ? '#DCFCE7' : '#F1F5F9',
      statusColor: status === 'Active' ? '#16A34A' : '#64748B',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    };

    onAddRM(newRM);
    setName('');
    setPhone('');
    setEmail('');
    setPassword('12345');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <h3>Add Relationship Manager</h3>
            <p>Register a new RM to supervise customer leads & site visits</p>
          </div>
          <button
            type="button"
            className="admin-drawer-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="admin-modal-body">
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

            <div className="admin-form-group">
              <label className="admin-form-label">Full Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Shalini Verma"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Phone Number *</label>
                <input
                  type="tel"
                  className="admin-form-input"
                  placeholder="e.g. 7275004901"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">RM Status</label>
                <select
                  className="admin-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Active Duty</option>
                  <option value="On Leave">On Leave</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Work Email *</label>
              <input
                type="email"
                className="admin-form-input"
                placeholder="shalini.rm@eformx.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Assigned Territory / Cluster</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Gomti Nagar & Shaheed Path"
                value={territory}
                onChange={(e) => setTerritory(e.target.value)}
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Initial Password *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. 12345"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
            >
              <span>+ Register RM</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


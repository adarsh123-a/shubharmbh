import React, { useState } from 'react';

export default function RMScheduleVisitModal({ isOpen, onClose, onScheduleVisit }) {
  const [client, setClient] = useState('');
  const [phone, setPhone] = useState('');
  const [property, setProperty] = useState('');
  const [location, setLocation] = useState('Gomti Nagar, Lucknow');
  const [time, setTime] = useState('');
  const [status, setStatus] = useState('Scheduled');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!client.trim()) {
      setError('Client name is required');
      return;
    }
    if (!phone.trim()) {
      setError('Client phone is required');
      return;
    }
    if (!property.trim()) {
      setError('Property name is required');
      return;
    }
    if (!time.trim()) {
      setError('Schedule time/date is required');
      return;
    }

    const newVisit = {
      id: `visit-${Date.now()}`,
      time: time.trim(),
      client: client.trim(),
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91${phone.trim()}`,
      property: property.trim(),
      location: location.trim() || 'Lucknow, UP',
      status: status,
      statusBg: status === 'Scheduled' ? '#DCFCE7' : '#FEF3C7',
      statusColor: status === 'Scheduled' ? '#16A34A' : '#D97706',
    };

    onScheduleVisit(newVisit);
    setClient('');
    setPhone('');
    setProperty('');
    setTime('');
    setError('');
    onClose();
  };

  return (
    <div className="rm-modal-backdrop" onClick={onClose}>
      <div className="rm-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="rm-modal-header">
          <div>
            <h3>Schedule New Site Visit</h3>
            <p>Book an accompanied client property walkthrough</p>
          </div>
          <button
            type="button"
            className="rm-drawer-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="rm-modal-body">
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

            <div className="rm-form-group">
              <label className="rm-form-label">Client Name *</label>
              <input
                type="text"
                className="rm-form-input"
                placeholder="e.g. Dr. Rajesh Sharma"
                value={client}
                onChange={(e) => {
                  setClient(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="rm-form-row">
              <div className="rm-form-group">
                <label className="rm-form-label">Client Phone *</label>
                <input
                  type="tel"
                  className="rm-form-input"
                  placeholder="e.g. 7275004901"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label">Visit Status</label>
                <select
                  className="rm-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Scheduled">Scheduled (Confirmed)</option>
                  <option value="Pending Confirmation">Pending Confirmation</option>
                </select>
              </div>
            </div>

            <div className="rm-form-group">
              <label className="rm-form-label">Property Title *</label>
              <input
                type="text"
                className="rm-form-input"
                placeholder="e.g. 3 BHK Luxury Independent House"
                value={property}
                onChange={(e) => {
                  setProperty(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="rm-form-row">
              <div className="rm-form-group">
                <label className="rm-form-label">Schedule Date / Time *</label>
                <input
                  type="text"
                  className="rm-form-input"
                  placeholder="e.g. Today, 4:00 PM"
                  value={time}
                  onChange={(e) => {
                    setTime(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label">Location / Area</label>
                <input
                  type="text"
                  className="rm-form-input"
                  placeholder="e.g. Gomti Nagar, Lucknow"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="rm-modal-footer">
            <button
              type="button"
              className="rm-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rm-btn-primary"
            >
              <span>+ Confirm Schedule</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


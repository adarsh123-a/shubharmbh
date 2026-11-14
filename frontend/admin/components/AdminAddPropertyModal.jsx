import React, { useState } from 'react';
import { adminService } from '../services/adminService.js';

export default function AdminAddPropertyModal({ isOpen, onClose, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [landId, setLandId] = useState('');
  const [location, setLocation] = useState('चकेरी, कानपुर');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [price, setPrice] = useState('');
  const [specs, setSpecs] = useState('');
  const [status, setStatus] = useState('For Sale');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Site / Project title is required');
      return;
    }
    if (!price.trim()) {
      setError('Price / Rate is required');
      return;
    }
    if (!location.trim()) {
      setError('Location is required');
      return;
    }

    const landNum = parseInt(landId.trim(), 10) || Math.floor((Date.now() % 900) + 10);
    const payload = {
      land: landNum,
      side_name: title.trim(),
      lat: latitude.trim() || '26.4095280',
      lng: longitude.trim() || '80.3894150',
      plots: [],
    };

    setIsSubmitting(true);
    try {
      await adminService.createProperty(payload);
    } catch (err) {
      console.warn('Backend property creation fallback:', err.message);
      if (err.message && err.message.includes('already exists')) {
        setError(err.message);
        setIsSubmitting(false);
        return;
      }
    }

    const formattedPrice = price.trim().startsWith('₹') ? price.trim() : `₹ ${price.trim()}`;
    const statusMap = {
      'For Sale': { bg: '#DCFCE7', color: '#16A34A' },
      'Sold': { bg: '#DBEAFE', color: '#2563EB' },
      'Draft': { bg: '#F1F5F9', color: '#64748B' },
    };

    const newProperty = {
      id: `land-${landNum}`,
      landId: String(landNum),
      title: title.trim(),
      location: location.trim(),
      latitude: latitude.trim() || '26.4095280',
      longitude: longitude.trim() || '80.3894150',
      specs: specs.trim() || 'Verified Land Plots • Registry Ready',
      price: formattedPrice,
      status: status,
      statusBg: statusMap[status]?.bg || '#DCFCE7',
      statusColor: statusMap[status]?.color || '#16A34A',
      totalPlots: 50,
      availablePlots: status === 'Sold' ? 0 : 38,
    };

    onAddProperty(newProperty);
    setTitle('');
    setLandId('');
    setPrice('');
    setSpecs('');
    setLatitude('');
    setLongitude('');
    setError('');
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <h3>Add Land / Plot Scheme</h3>
            <p>Publish a new zameen / plot site to inventory</p>
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
              <label className="admin-form-label">Site / Project Name *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. एयरपोर्ट चकेरी लैंड प्रोजेक्ट (फेज 2)"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Land ID / Number</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 15"
                  value={landId}
                  onChange={(e) => setLandId(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Rate / Starting Price *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. ₹ 4,500 / गज (₹ 5.5 Lakh)"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Status</label>
                <select
                  className="admin-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="For Sale">For Sale (Live)</option>
                  <option value="Draft">Draft (Review)</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Location *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. चकेरी, कानपुर"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Plots & Area Specs</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 50 Plots • 100 to 300 गज"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div className="admin-form-group">
                <label className="admin-form-label">Latitude</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 26.4095280"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Longitude</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 80.3894150"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              className="admin-btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn-primary"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Saving...' : '+ Add Land Scheme'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

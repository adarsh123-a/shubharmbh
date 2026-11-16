import React, { useState, useEffect } from 'react';
import { superAdminService } from '../services/superAdminService.js';

export default function SuperAdminEditPropertyModal({ isOpen, onClose, property, onUpdateProperty }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [totalPlots, setTotalPlots] = useState('20');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [price, setPrice] = useState('');
  const [specs, setSpecs] = useState('');
  const [status, setStatus] = useState('For Sale');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (property) {
      setTitle(property.title || '');
      setLocation(property.location || '');
      setTotalPlots(String(property.totalPlots ?? property.availablePlots ?? 20));
      setLatitude(property.latitude || '');
      setLongitude(property.longitude || '');
      setPrice(property.price || '');
      setSpecs(property.specs || '');
      setStatus(property.status || 'For Sale');
      setError('');
    }
  }, [property]);

  if (!isOpen || !property) return null;

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

    const numPlots = totalPlots !== '' ? parseInt(totalPlots.trim(), 10) : (property.totalPlots || 20);
    const validCount = isNaN(numPlots) || numPlots < 0 ? 20 : numPlots;
    const landNum = Number(property.landId);

    const baseRate = parseInt(String(price || '').replace(/[^0-9]/g, ''), 10) || 4500;
    const plotConfigs = [
      { area: 100, unit: 'गज' },
      { area: 120, unit: 'गज' },
      { area: 150, unit: 'गज' },
      { area: 180, unit: 'गज' },
      { area: 200, unit: 'गज' },
      { area: 250, unit: 'गज' },
      { area: 900, unit: 'वर्ग फुट' },
      { area: 1200, unit: 'वर्ग फुट' },
    ];

    const updatedPlots = [];
    for (let i = 1; i <= validCount; i++) {
      const cfg = plotConfigs[(i - 1) % plotConfigs.length];
      const plotPrice = String(cfg.area * baseRate);
      updatedPlots.push({
        id: i,
        land_id: landNum,
        plot_id: `L${landNum}-PLOT-${String(i).padStart(3, '0')}`,
        price: plotPrice,
        area: String(cfg.area),
        land_unit: cfg.unit,
        status: status === 'Sold' ? 'sold' : 'available',
        booking_id: null,
      });
    }

    const payload = {
      side_name: title.trim(),
      location: location.trim(),
      price: price.trim(),
      lat: latitude.trim() || '26.4095280',
      lng: longitude.trim() || '80.3894150',
      status: status === 'For Sale' ? 'true' : (status === 'Sold' ? 'sold' : 'draft'),
      plots: updatedPlots,
    };

    setIsSubmitting(true);
    try {
      await superAdminService.updateProperty(property.landId, payload);
    } catch (err) {
      console.warn('Backend property update fallback:', err.message);
    }

    const statusMap = {
      'For Sale': { bg: '#DCFCE7', color: '#16A34A' },
      'Sold': { bg: '#DBEAFE', color: '#2563EB' },
      'Draft': { bg: '#F1F5F9', color: '#64748B' },
    };

    const updated = {
      ...property,
      title: title.trim(),
      location: location.trim(),
      latitude: latitude.trim() || '26.4095280',
      longitude: longitude.trim() || '80.3894150',
      specs: specs.trim() || `${validCount} Plots • 100 to 500 गज • Clear Title`,
      price: price.trim(),
      status: status,
      statusBg: statusMap[status]?.bg || '#DCFCE7',
      statusColor: statusMap[status]?.color || '#16A34A',
      totalPlots: validCount,
      availablePlots: status === 'Sold' ? 0 : validCount,
      plots: updatedPlots,
    };

    onUpdateProperty(updated);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="super-admin-modal-backdrop" onClick={onClose}>
      <div className="super-admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="super-admin-modal-header">
          <div>
            <h3>Edit Land / Plot Scheme</h3>
            <p>Modify Land #{property.landId} project details & rates</p>
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
              <label className="super-admin-form-label">Site / Project Name *</label>
              <input
                type="text"
                className="super-admin-form-input"
                placeholder="e.g. एयरपोर्ट चकेरी लैंड प्रोजेक्ट"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Land ID (Permanent)</label>
                <input
                  type="text"
                  className="super-admin-form-input"
                  value={`Land #${property.landId}`}
                  disabled
                  style={{ backgroundColor: '#F1F5F9', color: '#64748B', cursor: 'not-allowed' }}
                />
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Rate / Starting Price (₹ Digits only) *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="super-admin-form-input"
                  placeholder="e.g. 4500 (per गज)"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value.replace(/\D/g, ''));
                    if (error) setError('');
                  }}
                  required
                />
              </div>
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Status</label>
                <select
                  className="super-admin-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="For Sale">For Sale (Live)</option>
                  <option value="Draft">Draft (Review)</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Total Plots Count *</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="super-admin-form-input"
                  placeholder="e.g. 20 (Total plots to generate)"
                  value={totalPlots}
                  onChange={(e) => setTotalPlots(e.target.value.replace(/\D/g, ''))}
                  required
                />
              </div>
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Location *</label>
                <input
                  type="text"
                  className="super-admin-form-input"
                  placeholder="e.g. चकेरी, कानपुर"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Plots & Area Specs</label>
                <input
                  type="text"
                  className="super-admin-form-input"
                  placeholder="e.g. 50 Plots • 100 to 300 गज"
                  value={specs}
                  onChange={(e) => setSpecs(e.target.value)}
                />
              </div>
            </div>

            <div className="super-admin-form-row">
              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Latitude (Numbers only)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  className="super-admin-form-input"
                  placeholder="e.g. 26.4095280"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>

              <div className="super-admin-form-group">
                <label className="super-admin-form-label">Longitude (Numbers only)</label>
                <input
                  type="text"
                  inputMode="decimal"
                  className="super-admin-form-input"
                  placeholder="e.g. 80.3894150"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value.replace(/[^0-9.]/g, ''))}
                />
              </div>
            </div>
          </div>

          <div className="super-admin-modal-footer">
            <button
              type="button"
              className="super-admin-btn-secondary"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="super-admin-btn-primary"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Updating...' : '✓ Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { superAdminService } from '../services/superAdminService.js';

export default function SuperAdminAddPropertyModal({ isOpen, onClose, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [landId, setLandId] = useState('');
  const [location, setLocation] = useState('चकेरी, कानपुर');
  const [totalPlots, setTotalPlots] = useState('20');
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

    const numPlots = totalPlots !== '' ? parseInt(totalPlots.trim(), 10) : 20;
    const validCount = isNaN(numPlots) || numPlots < 0 ? 20 : numPlots;
    const landNum = parseInt(landId.trim(), 10) || Math.floor((Date.now() % 900) + 10);

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

    const generatedPlots = [];
    for (let i = 1; i <= validCount; i++) {
      const cfg = plotConfigs[(i - 1) % plotConfigs.length];
      const plotPrice = String(cfg.area * baseRate);
      generatedPlots.push({
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
      land: landNum,
      side_name: title.trim(),
      location: location.trim() || 'चकेरी, कानपुर',
      price: price.trim() || '₹ 4,500 / गज',
      lat: latitude.trim() || '26.4095280',
      lng: longitude.trim() || '80.3894150',
      plots: generatedPlots,
      totalPlots: validCount,
    };

    setIsSubmitting(true);
    setError('');

    try {
      const created = await superAdminService.createProperty(payload);

      const formattedPrice = price.trim().startsWith('₹') ? price.trim() : `₹ ${price.trim()}`;
      const statusMap = {
        'For Sale': { bg: '#DCFCE7', color: '#16A34A' },
        'Sold': { bg: '#DBEAFE', color: '#2563EB' },
        'Draft': { bg: '#F1F5F9', color: '#64748B' },
      };

      const finalPlots = Array.isArray(created?.plots) && created.plots.length > 0 ? created.plots : generatedPlots;
      const totalPlotsCount = finalPlots.length;
      const availCount = status === 'Sold' ? 0 : finalPlots.filter((p) => (p.status || 'available').toLowerCase() === 'available').length;

      const newProperty = {
        id: `land-${created?.land || landNum}`,
        landId: String(created?.land || landNum),
        title: created?.side_name || title.trim(),
        location: created?.location || location.trim(),
        latitude: created?.lat || latitude.trim() || '26.4095280',
        longitude: created?.lng || longitude.trim() || '80.3894150',
        specs: specs.trim() || `${totalPlotsCount} Plots • 100 to 500 गज • Clear Title`,
        price: created?.price || formattedPrice,
        status: status,
        statusBg: statusMap[status]?.bg || '#DCFCE7',
        statusColor: statusMap[status]?.color || '#16A34A',
        totalPlots: totalPlotsCount,
        availablePlots: availCount,
        plots: finalPlots,
      };

      onAddProperty(newProperty);
      setTitle('');
      setLandId('');
      setPrice('');
      setTotalPlots('20');
      setSpecs('');
      setLatitude('');
      setLongitude('');
      setError('');
      setIsSubmitting(false);
      onClose();
    } catch (err) {
      console.error('Property creation failed:', err);
      setError(err.message || 'सर्वर से कनेक्ट नहीं हो सका या डेटा सेव नहीं हुआ। कृपया दोबारा प्रयास करें।');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="super-admin-modal-backdrop" onClick={onClose}>
      <div className="super-admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="super-admin-modal-header">
          <div>
            <h3>Add Land / Plot Scheme</h3>
            <p>Publish a new zameen / plot site to the enterprise catalog</p>
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
                placeholder="e.g. एयरपोर्ट चकेरी लैंड प्रोजेक्ट (फेज 2)"
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
                <label className="super-admin-form-label">Land ID / Number (Digits only)</label>
                <input
                  type="text"
                  inputMode="numeric"
                  className="super-admin-form-input"
                  placeholder="e.g. 15"
                  value={landId}
                  onChange={(e) => setLandId(e.target.value.replace(/\D/g, ''))}
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
            >
              Cancel
            </button>
            <button
              type="submit"
              className="super-admin-btn-primary"
            >
              <span>+ Add Land Scheme</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


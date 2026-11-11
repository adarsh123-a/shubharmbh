import React, { useState } from 'react';

const SAMPLE_IMAGES = [
  { label: 'House', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  { label: 'Flat', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
  { label: 'Plot', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80' },
  { label: 'Villa', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80' },
  { label: 'Shop', url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=400&q=80' },
];

export default function AdminAddPropertyModal({ isOpen, onClose, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('Gomti Nagar, Lucknow');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState('For Sale');
  const [selectedImg, setSelectedImg] = useState(SAMPLE_IMAGES[0].url);
  const [customImg, setCustomImg] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!price.trim()) {
      setError('Price is required');
      return;
    }
    if (!location.trim()) {
      setError('Location is required');
      return;
    }

    const formattedPrice = price.trim().startsWith('₹') ? price.trim() : `₹ ${price.trim()}`;
    const statusMap = {
      'For Sale': { bg: '#DCFCE7', color: '#16A34A' },
      'Sold': { bg: '#DBEAFE', color: '#2563EB' },
      'Unavailable': { bg: '#FEE2E2', color: '#DC2626' },
      'Draft': { bg: '#F1F5F9', color: '#64748B' },
    };

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      price: formattedPrice,
      status: status,
      statusBg: statusMap[status]?.bg || '#DCFCE7',
      statusColor: statusMap[status]?.color || '#16A34A',
      leads: 0,
      img: customImg.trim() || selectedImg,
    };

    onAddProperty(newProperty);
    setTitle('');
    setPrice('');
    setCustomImg('');
    setError('');
    onClose();
  };

  return (
    <div className="admin-modal-backdrop" onClick={onClose}>
      <div className="admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
        <div className="admin-modal-header">
          <div>
            <h3>Add Inventory Property</h3>
            <p>List new residential or commercial project</p>
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
              <label className="admin-form-label">Property Title *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. 3 BHK Semi-Furnished Flat"
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
                <label className="admin-form-label">Price *</label>
                <input
                  type="text"
                  className="admin-form-input"
                  placeholder="e.g. 75 Lakh"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    if (error) setError('');
                  }}
                  required
                />
              </div>

              <div className="admin-form-group">
                <label className="admin-form-label">Listing Status</label>
                <select
                  className="admin-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="For Sale">For Sale (Live)</option>
                  <option value="Draft">Draft</option>
                  <option value="Sold">Sold</option>
                  <option value="Unavailable">Unavailable</option>
                </select>
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Location / Address *</label>
              <input
                type="text"
                className="admin-form-input"
                placeholder="e.g. Gomti Nagar, Lucknow"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Select Sample Photo</label>
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {SAMPLE_IMAGES.map((img) => (
                  <button
                    key={img.label}
                    type="button"
                    onClick={() => {
                      setSelectedImg(img.url);
                      setCustomImg('');
                    }}
                    style={{
                      border: (!customImg && selectedImg === img.url) ? '2px solid #D97706' : '1px solid #CBD5E1',
                      borderRadius: '10px',
                      padding: '2px',
                      background: '#FFFFFF',
                      cursor: 'pointer',
                      flexShrink: 0,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      style={{ width: '54px', height: '42px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                    <span style={{ fontSize: '10px', fontWeight: '700', color: '#334155', marginTop: '2px' }}>
                      {img.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-form-label">Or Custom Image URL</label>
              <input
                type="url"
                className="admin-form-input"
                placeholder="https://..."
                value={customImg}
                onChange={(e) => setCustomImg(e.target.value)}
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
              <span>+ Add to Inventory</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


import React, { useState } from 'react';

const SAMPLE_IMAGES = [
  { label: 'Villa', url: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80' },
  { label: 'House', url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  { label: 'Flat', url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80' },
  { label: 'Plot', url: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80' },
  { label: 'Commercial', url: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=400&q=80' },
];

export default function AgentAddPropertyModal({ isOpen, onClose, onAddProperty }) {
  const [title, setTitle] = useState('');
  const [propertyType, setPropertyType] = useState('Independent House / Villa');
  const [location, setLocation] = useState('Gomti Nagar, Lucknow');
  const [price, setPrice] = useState('');
  const [area, setArea] = useState('');
  const [status, setStatus] = useState('Active');
  const [selectedImg, setSelectedImg] = useState(SAMPLE_IMAGES[0].url);
  const [customImg, setCustomImg] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Property title is required');
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
    const finalImg = customImg.trim() || selectedImg;

    const newProperty = {
      id: `prop-${Date.now()}`,
      title: title.trim(),
      location: location.trim(),
      price: formattedPrice,
      area: area.trim() || 'N/A',
      type: propertyType,
      status: status,
      statusBg: status === 'Active' ? '#DCFCE7' : '#FEF3C7',
      statusColor: status === 'Active' ? '#16A34A' : '#D97706',
      leads: 0,
      img: finalImg,
    };

    onAddProperty(newProperty);
    // Reset form
    setTitle('');
    setPrice('');
    setArea('');
    setCustomImg('');
    setError('');
    onClose();
  };

  return (
    <div className="agent-modal-backdrop" onClick={onClose}>
      <div className="agent-modal-sheet" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="agent-modal-header">
          <div>
            <h3>Add New Property</h3>
            <p>Add a new listing to your agent portfolio</p>
          </div>
          <button
            type="button"
            className="agent-drawer-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit}>
          <div className="agent-modal-body">
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

            {/* Property Title */}
            <div className="agent-form-group">
              <label className="agent-form-label">
                <span>Customer Name</span>
              </label>
              <input
                type="text"
                className="agent-form-input"
                placeholder="Customer Name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (error) setError('');
                }}
                required
              />
            </div>

            {/* Property Type & Status */}
            <div className="agent-form-row">
              <div className="agent-form-group">
                <label className="agent-form-label">Mobile Number</label>
                <input type="number" max={10} className="agent-form-input" placeholder="Mobile Number" value={title} onChange={(e) => { setTitle(e.target.value); if (error) setError(''); }} required />
              </div>

              <div className="agent-form-group">
                <label className="agent-form-label">Location</label>
                <select
                  className="agent-form-select"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="Active">Maharajpur</option>
                  <option value="Pending">Sitaur</option>
                  <option value="Pending">Amuwan Road</option>
                  <option value="Pending">Purvanchal Expressway</option>
                </select>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="agent-modal-footer">
            <button
              type="button"
              className="agent-btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="agent-btn-primary"
            >
              <span>+ Add</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}


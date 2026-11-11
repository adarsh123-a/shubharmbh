import React, { useState } from 'react';

export default function CustomerPostPropertyView({ onPropertyAdded = () => { }, onNavigateTab = () => { } }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'Residential',
    location: '',
    price: '',
    area: '',
    contact: '+91 7275004901',
    description: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.location || !formData.price) {
      alert('Please fill Title, Location, and Expected Price.');
      return;
    }

    const newProperty = {
      id: `prop-user-${Date.now()}`,
      title: formData.title,
      category: formData.category,
      location: formData.location,
      price: formData.price.startsWith('₹') ? formData.price : `₹ ${formData.price}`,
      area: formData.area || '1200 sq.ft',
      status: 'Under Review',
      statusBg: '#FEF3C7',
      statusColor: '#D97706',
      leads: 0,
      submittedDate: 'Just now',
      img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
    };

    onPropertyAdded(newProperty);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      title: '',
      category: 'Residential',
      location: '',
      price: '',
      area: '',
      contact: '+91 7275004901',
      description: '',
    });
    setSubmitted(false);
  };

  return (
    <div className="tab-content-view customer-post-view" style={{ padding: '16px 16px 85px' }}>
      <div style={{ marginBottom: '16px' }}>
        <span style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          Free Listing
        </span>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '2px 0 4px' }}>
          List Your Property
        </h2>
        <p style={{ fontSize: '12px', color: '#64748B', margin: 0 }}>
          Directly reach verified buyers across Uttar Pradesh with zero brokerage.
        </p>
      </div>

      {submitted ? (
        <div
          style={{
            background: '#F0FDF4',
            borderRadius: '18px',
            border: '1px solid #BBF7D0',
            padding: '24px 18px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(22, 163, 74, 0.08)',
          }}
        >
          <div
            style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              background: '#DCFCE7',
              color: '#16A34A',
              fontSize: '26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px',
              border: '2px solid #86EFAC',
            }}
          >
            ✓
          </div>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#166534', margin: '0 0 6px' }}>
            Property Submitted Successfully!
          </h3>
          <p style={{ fontSize: '12.5px', color: '#374151', margin: '0 0 18px', lineHeight: 1.5 }}>
            Aapki listing review ke liye bhej di gayi hai. Shubharambh Realty verification team 24 ghante ke andar ise live karegi.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
            <button
              type="button"
              onClick={() => onNavigateTab('my-property')}
              style={{
                background: '#16A34A',
                color: '#FFFFFF',
                padding: '12px',
                borderRadius: '12px',
                border: 'none',
                fontWeight: '700',
                fontSize: '13.5px',
                cursor: 'pointer',
              }}
            >
              View in My Properties
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={{
                background: '#FFFFFF',
                color: '#374151',
                padding: '11px',
                borderRadius: '12px',
                border: '1px solid #E5E7EB',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
              }}
            >
              + Post Another Property
            </button>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '18px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '13px',
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
              Property Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. 3 BHK Luxury Villa / 200 Gaj Plot"
              required
              style={{
                width: '100%',
                padding: '11px 12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  background: '#FFFFFF',
                  boxSizing: 'border-box',
                }}
              >
                <option value="Residential">Residential</option>
                <option value="Plots">Land & Plots</option>
                <option value="Commercial">Commercial</option>
                <option value="Luxury">Luxury Villa</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
                Area / Size
              </label>
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="e.g. 1500 sq.ft"
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
                Expected Price *
              </label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 75 Lakh"
                required
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
                Contact Phone
              </label>
              <input
                type="tel"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '11px 12px',
                  borderRadius: '10px',
                  border: '1px solid #CBD5E1',
                  fontSize: '13px',
                  outline: 'none',
                  boxSizing: 'border-box',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
              Exact Location / Landmark *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g. Gomti Nagar / Ramadevi, Kanpur"
              required
              style={{
                width: '100%',
                padding: '11px 12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '12px', fontWeight: '700', color: '#334155', marginBottom: '5px' }}>
              Short Description (Optional)
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Key amenities, facing direction, road width, etc."
              style={{
                width: '100%',
                padding: '11px 12px',
                borderRadius: '10px',
                border: '1px solid #CBD5E1',
                fontSize: '13px',
                outline: 'none',
                resize: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              padding: '13px',
              borderRadius: '12px',
              border: 'none',
              fontWeight: '700',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '4px',
              boxShadow: '0 4px 12px rgba(15, 23, 42, 0.15)',
            }}
          >
            Submit Property for Verification
          </button>
        </form>
      )}
    </div>
  );
}


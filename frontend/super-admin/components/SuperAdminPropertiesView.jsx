import React, { useState } from 'react';
import SuperAdminAddPropertyModal from './SuperAdminAddPropertyModal.jsx';

const SA_INVENTORY = [
  {
    id: 'prop-1',
    title: '3 BHK Independent House',
    location: 'Lucknow, Uttar Pradesh',
    specs: '1600 sq.ft • 3 BHK • 3 Bath',
    price: '₹ 85 Lakh',
    status: 'For Sale',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-2',
    title: '2 BHK Apartment',
    location: 'Gomti Nagar, Lucknow',
    specs: '1200 sq.ft • 2 BHK • 2 Bath',
    price: '₹ 65 Lakh',
    status: 'For Sale',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-3',
    title: 'Residential Plot Scheme',
    location: 'Faizabad Road, Lucknow',
    specs: '2100 sq.ft • Commercial Plot',
    price: '₹ 32 Lakh',
    status: 'Sold',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-4',
    title: '4 BHK Luxury Villa',
    location: 'Sushant Golf City, Lucknow',
    specs: '3200 sq.ft • 4 BHK • 4 Bath',
    price: '₹ 1.45 Cr',
    status: 'Draft',
    statusBg: '#F1F5F9',
    statusColor: '#64748B',
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
  },
];

export default function SuperAdminPropertiesView({ onNavigate = () => {} }) {
  const [inventoryList, setInventoryList] = useState(SA_INVENTORY);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const filtered = inventoryList.filter((item) => {
    const matchesFilter = filter === 'all' || item.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddProperty = (newProp) => {
    setInventoryList((prev) => [newProp, ...prev]);
    setNotice(`Platform property "${newProp.title}" listed successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="super-admin-main-content super-admin-properties-view">
      {notice && (
        <div
          style={{
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            padding: '8px 14px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: '700',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✅ {notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer', fontWeight: '800' }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Platform Properties
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {inventoryList.length + 124} Total Enterprise Listings
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '11.5px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          + Add Property
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search all Lucknow properties..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '9px 12px 9px 34px',
            fontSize: '12px',
            color: '#0F172A',
            outline: 'none',
          }}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.2"
          style={{ position: 'absolute', left: '11px', top: '10px' }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'All (128)' },
          { id: 'for sale', label: 'For Sale (68)' },
          { id: 'sold', label: 'Sold (18)' },
          { id: 'draft', label: 'Draft (30)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '5px 11px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: filter === tab.id ? '#D97706' : '#FFFFFF',
              color: filter === tab.id ? '#FFFFFF' : '#64748B',
              fontSize: '10.5px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {filtered.map((prop) => (
          <div
            key={prop.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              gap: '12px',
            }}
          >
            <img
              src={prop.img}
              alt={prop.title}
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '12px',
                objectFit: 'cover',
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '6px' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {prop.title}
                  </h4>
                  <span
                    style={{
                      backgroundColor: prop.statusBg,
                      color: prop.statusColor,
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      flexShrink: 0,
                    }}
                  >
                    {prop.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  📍 {prop.location}
                </div>
                <div style={{ fontSize: '9.5px', color: '#94A3B8' }}>
                  {prop.specs}
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '6px' }}>
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#0F172A' }}>
                  {prop.price}
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('enquiries')}
                  style={{
                    background: '#EFF6FF',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#2563EB',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 8px',
                    cursor: 'pointer',
                  }}
                >
                  View Enquiries ›
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <SuperAdminAddPropertyModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
}

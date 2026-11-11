import React, { useState } from 'react';
import AgentAddPropertyModal from './AgentAddPropertyModal.jsx';

const PROPERTIES_DATA = [
  {
    id: 'prop-1',
    title: '3 BHK Independent House',
    location: 'Lucknow, Uttar Pradesh',
    price: '₹ 85 Lakh',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    leads: 14,
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-2',
    title: '2 BHK Apartment',
    location: 'Gomti Nagar, Lucknow',
    price: '₹ 65 Lakh',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    leads: 8,
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-3',
    title: 'Residential Plot',
    location: 'Faizabad Road, Lucknow',
    price: '₹ 32 Lakh',
    status: 'Pending',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    leads: 3,
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-4',
    title: '4 BHK Luxury Villa',
    location: 'Sushant Golf City, Lucknow',
    price: '₹ 1.45 Cr',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    leads: 19,
    img: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-5',
    title: 'Commercial Retail Shop',
    location: 'Hazratganj, Lucknow',
    price: '₹ 50 Lakh',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    leads: 6,
    img: 'https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'prop-6',
    title: 'Agricultural Farm Land',
    location: 'Raebareli Road, Lucknow',
    price: '₹ 45 Lakh',
    status: 'Pending',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    leads: 2,
    img: 'https://images.unsplash.com/photo-1500076656116-558758c991c1?auto=format&fit=crop&w=400&q=80',
  },
];

export default function AgentPropertiesView({ onNavigate = () => {} }) {
  const [propertiesList, setPropertiesList] = useState(PROPERTIES_DATA);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [successNotice, setSuccessNotice] = useState('');

  const activeCount = propertiesList.filter((p) => p.status === 'Active').length;
  const pendingCount = propertiesList.filter((p) => p.status === 'Pending').length;

  const filteredProperties = propertiesList.filter((p) => {
    const matchesFilter = filter === 'all' || p.status.toLowerCase() === filter;
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddProperty = (newProperty) => {
    setPropertiesList((prev) => [newProperty, ...prev]);
    setSuccessNotice(`Property "${newProperty.title}" successfully added to portfolio!`);
    setTimeout(() => {
      setSuccessNotice('');
    }, 4000);
  };

  return (
    <div className="agent-main-content agent-properties-view">
      {successNotice && (
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
            boxShadow: '0 2px 6px rgba(22, 163, 74, 0.1)',
          }}
        >
          <span>✅ {successNotice}</span>
          <button
            type="button"
            onClick={() => setSuccessNotice('')}
            style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer', fontWeight: '800' }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            My Properties
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            Total {propertiesList.length} Portfolio Listings
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '11.5px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            boxShadow: '0 2px 6px rgba(217, 119, 6, 0.3)',
          }}
        >
          <span>+ Add Property</span>
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title or location..."
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
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
        {[
          { id: 'all', label: `All (${propertiesList.length})` },
          { id: 'active', label: `Active (${activeCount})` },
          { id: 'pending', label: `Pending (${pendingCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              border: filter === tab.id ? '1px solid #D97706' : '1px solid #E2E8F0',
              backgroundColor: filter === tab.id ? '#FEF3C7' : '#FFFFFF',
              color: filter === tab.id ? '#92400E' : '#64748B',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Listing Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {filteredProperties.map((prop) => (
          <div
            key={prop.id}
            className="agent-pressable"
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
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  📍 {prop.location}
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
                  {prop.leads} Enquiries ›
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Property Modal */}
      <AgentAddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddProperty={handleAddProperty}
      />
    </div>
  );
}

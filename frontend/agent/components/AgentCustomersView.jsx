import React, { useState } from 'react';

const CUSTOMERS_DATA = [
  {
    id: 'cust-1',
    name: 'Amitabh Verma',
    phone: '+917275004901',
    location: 'Indira Nagar, Lucknow',
    property: '3 BHK Villa, Golf City',
    status: 'Site Visit Scheduled',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    date: '28 Oct 2026',
  },
  {
    id: 'cust-2',
    name: 'Priyanka Saxena',
    phone: '+917275004901',
    location: 'Aliganj, Lucknow',
    property: '2 BHK Apartment, Gomti Nagar',
    status: 'Negotiation',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    date: '27 Oct 2026',
  },
  {
    id: 'cust-3',
    name: 'Suresh Chandra',
    phone: '+917275004901',
    location: 'Kanpur Road, Lucknow',
    property: 'Commercial Plot, Faizabad Rd',
    status: 'Booking Token In Progress',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    date: '26 Oct 2026',
  },
  {
    id: 'cust-4',
    name: 'Neelam Tiwari',
    phone: '+917275004901',
    location: 'Mahanagar, Lucknow',
    property: '4 BHK Luxury House',
    status: 'Follow Up',
    statusBg: '#F3E8FF',
    statusColor: '#9333EA',
    date: '25 Oct 2026',
  },
];

export default function AgentCustomersView() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = CUSTOMERS_DATA.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.property.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agent-main-content agent-customers-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Assigned Customers
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          16 Active Clients in Pipeline
        </span>
      </div>

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search customer by name or property..."
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

      {/* Customer List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {filtered.map((cust) => (
          <div
            key={cust.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {cust.name}
              </h4>
              <span
                style={{
                  backgroundColor: cust.statusBg,
                  color: cust.statusColor,
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {cust.status}
              </span>
            </div>

            <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '4px' }}>
              🏡 Interested in: <strong>{cust.property}</strong>
            </div>

            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginBottom: '10px' }}>
              📍 {cust.location} • Stage updated: {cust.date}
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <a
                href={`tel:${cust.phone}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                📞 Call Client
              </a>
              <a
                href={`https://wa.me/917275004901?text=Hello%20${encodeURIComponent(cust.name)},%20regarding%20${encodeURIComponent(cust.property)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

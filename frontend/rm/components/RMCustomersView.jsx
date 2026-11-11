import React, { useState } from 'react';

const RM_CUSTOMERS_LIST = [
  {
    id: 'cust-1',
    name: 'Rahul Sharma',
    phone: '+917275004901',
    property: '3 BHK in Gomti Nagar',
    status: 'Site Visit Scheduled',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    nextAction: 'Visit Today at 10:00 AM',
  },
  {
    id: 'cust-2',
    name: 'Preeti Kumar',
    phone: '+917275004901',
    property: 'Plot in Faizabad Road',
    status: 'Call Scheduled',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    nextAction: 'Budget discussion Today 12:00 PM',
  },
  {
    id: 'cust-3',
    name: 'Amit Mishra',
    phone: '+917275004901',
    property: 'Independent House',
    status: 'Site Visit Scheduled',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    nextAction: 'Site Visit Today at 02:30 PM',
  },
  {
    id: 'cust-4',
    name: 'Sneha Gupta',
    phone: '+917275004901',
    property: '2 BHK Apartment',
    status: 'Follow Up',
    statusBg: '#FFE4E6',
    statusColor: '#E11D48',
    nextAction: 'Send brochure details Today 04:00 PM',
  },
  {
    id: 'cust-5',
    name: 'Dr. Alok Srivastava',
    phone: '+917275004901',
    property: 'Villa in Sushant Golf City',
    status: 'Negotiation',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    nextAction: 'Offer review tomorrow',
  },
];

export default function RMCustomersView() {
  const [query, setQuery] = useState('');

  const filtered = RM_CUSTOMERS_LIST.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    c.property.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="rm-main-content rm-customers-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          My Customers
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          12 Active Assigned Relationship Accounts
        </span>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

      {/* Customers List */}
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
              📅 Next Action: {cust.nextAction}
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
                📞 Call Customer
              </a>
              <a
                href={`https://wa.me/917275004901?text=Hello%20${encodeURIComponent(cust.name)},%20this%20is%20your%20Relationship%20Manager%20from%20Shubharambh%20Realty`}
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

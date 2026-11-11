import React, { useState } from 'react';

const ENQUIRIES_DATA = [
  {
    id: 'enq-1',
    initials: 'VK',
    avatarBg: '#8B5CF6',
    name: 'Vikash Singh',
    detail: 'Interested in 3 BHK Independent House',
    budget: '₹ 80-90 Lakh',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '15 mins ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    id: 'enq-2',
    initials: 'SP',
    avatarBg: '#F59E0B',
    name: 'Sunita Patel',
    detail: 'Plot enquiry in Gomti Nagar Ext.',
    budget: '₹ 30-35 Lakh',
    badgeText: 'Call',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '1 hour ago',
    phone: '+917275004901',
    category: 'callback',
  },
  {
    id: 'enq-3',
    initials: 'AR',
    avatarBg: '#7C3AED',
    name: 'Aakash Raj',
    detail: '2 BHK Apartment, Gomti Nagar',
    budget: '₹ 60-70 Lakh',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '2 hours ago',
    phone: '+917275004901',
    category: 'interested',
  },
  {
    id: 'enq-4',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Pooja Kumari',
    detail: 'Luxury Villa enquiry',
    budget: '₹ 1.2 - 1.5 Cr',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '3 hours ago',
    phone: '+917275004901',
    category: 'followup',
  },
  {
    id: 'enq-5',
    initials: 'RG',
    avatarBg: '#059669',
    name: 'Rahul Gupta',
    detail: 'Commercial Retail Shop inquiry',
    budget: '₹ 45-55 Lakh',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '5 hours ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    id: 'enq-6',
    initials: 'MS',
    avatarBg: '#D97706',
    name: 'Manish Sharma',
    detail: 'Farm land investment',
    budget: '₹ 40-50 Lakh',
    badgeText: 'Call',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: 'Yesterday',
    phone: '+917275004901',
    category: 'callback',
  },
];

export default function AgentEnquiriesView() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = ENQUIRIES_DATA.filter((item) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'new') return item.category === 'new';
    if (activeFilter === 'callback') return item.category === 'callback';
    return true;
  });

  return (
    <div className="agent-main-content agent-enquiries-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Customer Enquiries
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Total 28 Active Leads
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '4px' }}>
        {[
          { id: 'all', label: 'All (28)' },
          { id: 'new', label: 'New (8)' },
          { id: 'callback', label: 'Callbacks (12)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveFilter(tab.id)}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              border: activeFilter === tab.id ? '1px solid #16A34A' : '1px solid #E2E8F0',
              backgroundColor: activeFilter === tab.id ? '#DCFCE7' : '#FFFFFF',
              color: activeFilter === tab.id ? '#15803D' : '#64748B',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Enquiries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((enq) => (
          <div
            key={enq.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: enq.avatarBg,
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {enq.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {enq.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {enq.detail}
                  </div>
                </div>
              </div>

              <span
                style={{
                  backgroundColor: enq.badgeBg,
                  color: enq.badgeColor,
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  flexShrink: 0,
                }}
              >
                {enq.badgeText}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <span style={{ fontSize: '10.5px', color: '#94A3B8' }}>
                🕒 {enq.time} • Budget: {enq.budget}
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <a
                  href={`tel:${enq.phone}`}
                  style={{
                    backgroundColor: '#DBEAFE',
                    color: '#2563EB',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  📞 Call
                </a>
                <a
                  href={`https://wa.me/917275004901?text=Hello%20${encodeURIComponent(enq.name)},%20regarding%20your%20property%20enquiry%20with%20Shubharambh%20Realty`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    backgroundColor: '#DCFCE7',
                    color: '#16A34A',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  💬 Chat
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

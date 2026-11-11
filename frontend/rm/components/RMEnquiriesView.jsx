import React, { useState } from 'react';

const RM_ALL_ENQUIRIES = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#0D9488',
    name: 'Rahul Sharma',
    detail: '3 BHK in Gomti Nagar',
    budget: '₹ 85 Lakh',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '10 mins ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    id: 'enq-2',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Preeti Kumar',
    detail: 'Plot in Faizabad Road',
    budget: '₹ 32 Lakh',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '25 mins ago',
    phone: '+917275004901',
    category: 'interested',
  },
  {
    id: 'enq-3',
    initials: 'AM',
    avatarBg: '#64748B',
    name: 'Amit Mishra',
    detail: 'Independent House',
    budget: '₹ 95 Lakh',
    badgeText: 'Site Visit',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    time: '1 hour ago',
    phone: '+917275004901',
    category: 'site_visit',
  },
  {
    id: 'enq-4',
    initials: 'SG',
    avatarBg: '#94A3B8',
    name: 'Sneha Gupta',
    detail: '2 BHK Apartment',
    budget: '₹ 65 Lakh',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '2 hours ago',
    phone: '+917275004901',
    category: 'follow_up',
  },
  {
    id: 'enq-5',
    initials: 'VK',
    avatarBg: '#8B5CF6',
    name: 'Vikash Singh',
    detail: '4 BHK Luxury Villa',
    budget: '₹ 1.5 Cr',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '3 hours ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    id: 'enq-6',
    initials: 'NK',
    avatarBg: '#EA580C',
    name: 'Nitin Kapoor',
    detail: 'Commercial Retail Shop',
    budget: '₹ 55 Lakh',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '5 hours ago',
    phone: '+917275004901',
    category: 'interested',
  },
];

export default function RMEnquiriesView() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = RM_ALL_ENQUIRIES.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="rm-main-content rm-enquiries-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          My Enquiries
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Total 18 Active Client Leads
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'All (18)' },
          { id: 'new', label: 'New (6)' },
          { id: 'interested', label: 'Interested (4)' },
          { id: 'site_visit', label: 'Site Visit (3)' },
          { id: 'follow_up', label: 'Follow Up (5)' },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '5px 12px',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: isActive ? '#92400E' : '#F1F5F9',
                color: isActive ? '#FFFFFF' : '#475569',
                fontSize: '10.5px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Leads Feed */}
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
                  href={`https://wa.me/917275004901?text=Hello%20${encodeURIComponent(enq.name)},%20regarding%20${encodeURIComponent(enq.detail)}`}
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
                  💬 WhatsApp
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React, { useState } from 'react';

const SA_ENQUIRIES_FEED = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#0D9488',
    name: 'Rahul Sharma',
    detail: '3 BHK in Gomti Nagar',
    admin: 'Admin Lucknow-01',
    rm: 'Ayush Srivastava',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '10 mins ago',
    category: 'new',
  },
  {
    id: 'enq-2',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Preeti Kumar',
    detail: 'Plot in Faizabad Road',
    admin: 'Admin Lucknow-01',
    rm: 'Pooja Verma',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '25 mins ago',
    category: 'interested',
  },
  {
    id: 'enq-3',
    initials: 'AM',
    avatarBg: '#64748B',
    name: 'Amit Mishra',
    detail: 'Independent House',
    admin: 'Admin Kanpur-02',
    rm: 'Rishabh Tiwari',
    badgeText: 'Site Visit',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    time: '1 hour ago',
    category: 'site_visit',
  },
  {
    id: 'enq-4',
    initials: 'SG',
    avatarBg: '#94A3B8',
    name: 'Sneha Gupta',
    detail: '2 BHK Apartment',
    admin: 'Admin Lucknow-01',
    rm: 'Ayush Srivastava',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '2 hours ago',
    category: 'follow_up',
  },
];

export default function SuperAdminEnquiriesView() {
  const [activeTab, setActiveTab] = useState('all');

  const filtered = SA_ENQUIRIES_FEED.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  return (
    <div className="super-admin-main-content super-admin-enquiries-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Master Enquiries Desk
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          342 Global Leads Across All Branches
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'All (342)' },
          { id: 'new', label: 'New (86)' },
          { id: 'interested', label: 'Interested (112)' },
          { id: 'site_visit', label: 'Site Visits (84)' },
          { id: 'follow_up', label: 'Follow Up (60)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '5px 11px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#D97706' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
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

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px', fontSize: '10.5px', color: '#64748B' }}>
              <span>
                🏛️ {enq.admin} • RM: <strong>{enq.rm}</strong>
              </span>
              <span style={{ color: '#94A3B8' }}>🕒 {enq.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

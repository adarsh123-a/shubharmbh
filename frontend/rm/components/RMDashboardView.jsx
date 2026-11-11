import React, { useState } from 'react';

const RM_KPIS = [
  {
    id: 'enquiries',
    label: 'My Enquiries',
    value: '18',
    trend: '↑ 20%',
    bgTint: '#E0F2FE',
    iconColor: '#0284C7',
    route: 'enquiries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'My Customers',
    value: '12',
    trend: '↑ 9%',
    bgTint: '#FFEDD5',
    iconColor: '#EA580C',
    route: 'customers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'visits',
    label: 'Site Visits',
    value: '6',
    trend: null,
    bgTint: '#FEF3C7',
    iconColor: '#D97706',
    route: 'visits',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
      </svg>
    ),
  },
  {
    id: 'bookings',
    label: 'Bookings',
    value: '3',
    trend: null,
    bgTint: '#F3E8FF',
    iconColor: '#9333EA',
    route: 'more',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
      </svg>
    ),
  },
];

const TODAYS_TASKS = [
  {
    id: 'task-1',
    dotColor: '#F97316',
    time: '10:00 AM',
    title: 'Site Visit - Rahul Sharma',
    subtitle: 'Gomti Nagar, Lucknow',
    badgeText: 'Upcoming',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    isAction: false,
    route: 'visits',
  },
  {
    id: 'task-2',
    dotColor: '#3B82F6',
    time: '12:00 PM',
    title: 'Call - Preeti Kumar',
    subtitle: 'Discuss budget',
    badgeText: 'Call',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    isAction: true,
    phone: '+917275004901',
    route: 'enquiries',
  },
  {
    id: 'task-3',
    dotColor: '#F59E0B',
    time: '02:30 PM',
    title: 'Site Visit - Amit Mishra',
    subtitle: 'Faizabad Road',
    badgeText: 'Upcoming',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    isAction: false,
    route: 'visits',
  },
  {
    id: 'task-4',
    dotColor: '#10B981',
    time: '04:00 PM',
    title: 'Follow Up - Sneha Gupta',
    subtitle: 'Send property details',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    isAction: false,
    route: 'enquiries',
  },
];

const MY_ENQUIRIES_ITEMS = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#0D9488',
    name: 'Rahul Sharma',
    detail: '3 BHK in Gomti Nagar',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '10 mins ago',
    type: 'new',
  },
  {
    id: 'enq-2',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Preeti Kumar',
    detail: 'Plot in Faizabad Road',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '25 mins ago',
    type: 'interested',
  },
  {
    id: 'enq-3',
    initials: 'AM',
    avatarBg: '#64748B',
    name: 'Amit Mishra',
    detail: 'Independent House',
    badgeText: 'Site Visit',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    time: '1 hour ago',
    type: 'site_visit',
  },
  {
    id: 'enq-4',
    initials: 'SG',
    avatarBg: '#94A3B8',
    name: 'Sneha Gupta',
    detail: '2 BHK Apartment',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '2 hours ago',
    type: 'follow_up',
  },
];

export default function RMDashboardView({ onNavigate = () => {} }) {
  const [activeFilter, setActiveFilter] = useState('new');

  const filteredEnquiries = MY_ENQUIRIES_ITEMS.filter((item) => {
    if (activeFilter === 'new') return item.type === 'new' || true;
    if (activeFilter === 'interested') return item.type === 'interested';
    if (activeFilter === 'site_visit') return item.type === 'site_visit';
    if (activeFilter === 'follow_up') return item.type === 'follow_up';
    return true;
  });

  return (
    <div className="rm-main-content rm-dashboard-view">
      {/* 1. RM Hero Banner Card */}
      <div
        className="rm-hero-card gpu-accel"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #172554 100%)',
          borderRadius: '20px',
          padding: '16px 14px',
          color: '#FFFFFF',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.16)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2, flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.4)',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              RM Dashboard
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Manage your enquiries and customers
            </p>
          </div>
        </div>

        {/* 3D Villa House Rendering on the Right */}
        <div style={{ zIndex: 2, flexShrink: 0, marginLeft: '8px' }}>
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80"
            alt="Villa"
            style={{
              width: '74px',
              height: '56px',
              borderRadius: '10px',
              objectFit: 'cover',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25)',
            }}
          />
        </div>

        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* 2. 4 Metric KPI Cards (2x2 Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {RM_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="rm-pressable"
            onClick={() => onNavigate(kpi.route)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '94px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: kpi.bgTint,
                  color: kpi.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700' }}>›</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
                {kpi.value}
              </span>
              {kpi.trend && (
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#16A34A' }}>
                  {kpi.trend}
                </span>
              )}
            </div>

            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B', marginTop: '3px' }}>
              {kpi.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Today's Tasks (Vertical Timeline) */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Today's Tasks
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('visits')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View All &gt;
          </button>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 12px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            position: 'relative',
          }}
        >
          {TODAYS_TASKS.map((task, idx) => (
            <div
              key={task.id}
              className="rm-pressable"
              onClick={() => onNavigate(task.route)}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                gap: '10px',
                position: 'relative',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', flex: 1, minWidth: 0 }}>
                {/* Timeline Dot */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3px' }}>
                  <div
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      backgroundColor: task.dotColor,
                      flexShrink: 0,
                    }}
                  />
                  {idx < TODAYS_TASKS.length - 1 && (
                    <div
                      style={{
                        width: '1px',
                        height: '28px',
                        backgroundColor: '#E2E8F0',
                        marginTop: '4px',
                      }}
                    />
                  )}
                </div>

                <div style={{ minWidth: 0 }}>
                  <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '1px' }}>
                    {task.time}
                  </span>
                  <div style={{ fontSize: '12.5px', fontWeight: '800', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.title}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {task.subtitle}
                  </div>
                </div>
              </div>

              {/* Status or Action Badge */}
              <div style={{ flexShrink: 0, alignSelf: 'center' }}>
                {task.isAction ? (
                  <a
                    href={`tel:${task.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundColor: task.badgeBg,
                      color: task.badgeColor,
                      fontSize: '11px',
                      fontWeight: '800',
                      padding: '3px 12px',
                      borderRadius: '9999px',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {task.badgeText}
                  </a>
                ) : (
                  <span
                    style={{
                      backgroundColor: task.badgeBg,
                      color: task.badgeColor,
                      fontSize: '10.5px',
                      fontWeight: '800',
                      padding: '3px 9px',
                      borderRadius: '9999px',
                    }}
                  >
                    {task.badgeText}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. My Enquiries Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            My Enquiries
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('enquiries')}
            style={{
              background: 'none',
              border: 'none',
              color: '#2563EB',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View All &gt;
          </button>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '2px' }}>
          {[
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
                  padding: '5px 11px',
                  borderRadius: '9999px',
                  border: 'none',
                  backgroundColor: isActive ? '#92400E' : '#F1F5F9',
                  color: isActive ? '#FFFFFF' : '#475569',
                  fontSize: '10.5px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'background-color 160ms ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Enquiries Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {filteredEnquiries.map((enq) => (
            <div
              key={enq.id}
              className="rm-pressable"
              onClick={() => onNavigate('enquiries')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '11px 12px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              }}
            >
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

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '3px', flexShrink: 0 }}>
                <span
                  style={{
                    backgroundColor: enq.badgeBg,
                    color: enq.badgeColor,
                    fontSize: '10.5px',
                    fontWeight: '800',
                    padding: '3px 9px',
                    borderRadius: '9999px',
                  }}
                >
                  {enq.badgeText}
                </span>
                <span style={{ fontSize: '9.5px', color: '#94A3B8', fontWeight: '500' }}>
                  {enq.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React from 'react';

const KPI_DATA = [
  {
    id: 'properties',
    label: 'Total Properties',
    value: '12',
    trend: '↑ 20%',
    bgTint: '#E0F2FE',
    iconColor: '#0284C7',
    route: 'properties',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    ),
  },
  {
    id: 'enquiries',
    label: ' Enquiries',
    value: '28',
    trend: '↑ 15%',
    bgTint: '#DCFCE7',
    iconColor: '#16A34A',
    route: 'enquiries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"></path>
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'My Customers',
    value: '16',
    trend: null,
    bgTint: '#FFEDD5',
    iconColor: '#EA580C',
    route: 'customers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },

];

const MY_PROPERTIES = [
  {
    id: 'prop-1',
    title: '3 BHK Independent House',
    location: 'Lucknow, Uttar Pradesh',
    price: '₹ 85 Lakh',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prop-2',
    title: '2 BHK Apartment',
    location: 'Gomti Nagar, Lucknow',
    price: '₹ 65 Lakh',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 'prop-3',
    title: 'Residential Plot',
    location: 'Faizabad Road, Lucknow',
    price: '₹ 32 Lakh',
    status: 'Pending',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=300&q=80',
  },
];

const RECENT_ENQUIRIES = [
  {
    id: 'enq-1',
    initials: 'VK',
    avatarBg: '#8B5CF6',
    name: 'Vikash Singh',
    detail: 'Interested in 3 BHK House',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '15 mins ago',
    isAction: false,
  },
  {
    id: 'enq-2',
    initials: 'SP',
    avatarBg: '#F59E0B',
    name: 'Sunita Patel',
    detail: 'Plot enquiry in Gomti Nagar',
    badgeText: 'Call',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '1 hour ago',
    isAction: true,
    phone: '+917275004901',
  },
  {
    id: 'enq-3',
    initials: 'AR',
    avatarBg: '#7C3AED',
    name: 'Aakash Raj',
    detail: '2 BHK Apartment',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '2 hours ago',
    isAction: false,
  },
  {
    id: 'enq-4',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Pooja Kumari',
    detail: 'Villa enquiry',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '3 hours ago',
    isAction: false,
  },
];

export default function AgentDashboardView({ onNavigate = () => { } }) {
  return (
    <div className="agent-main-content agent-dashboard-view">
      {/* 1. Agent Hero Banner (101% Carbon Copy of Screenshot) */}
      <div
        className="agent-hero-card gpu-accel"
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
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              Agent Dashboard
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Manage your properties and customer enquiries
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
        {KPI_DATA.map((kpi) => (
          <div
            key={kpi.id}
            className="agent-pressable"
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

      {/* 3. My Properties Section */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Available Properties
          </h3>
          <button
            type="button"
            onClick={() => onNavigate('properties')}
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {MY_PROPERTIES.map((prop) => (
            <div
              key={prop.id}
              className="agent-pressable"
              onClick={() => onNavigate('properties')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '10px',
                border: '1px solid #E2E8F0',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              }}
            >
              <img
                src={prop.img}
                alt={prop.title}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: '800',
                    color: '#0F172A',
                    margin: '0 0 3px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {prop.title}
                </h4>
                <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '6px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {prop.location}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>
                  {prop.price}
                </div>
              </div>
              <span
                style={{
                  backgroundColor: prop.statusBg,
                  color: prop.statusColor,
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  flexShrink: 0,
                  alignSelf: 'center',
                }}
              >
                {prop.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Recent Enquiries Section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Recent Enquiries
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

        <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
          {RECENT_ENQUIRIES.map((enq) => (
            <div
              key={enq.id}
              className="agent-pressable"
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
                {enq.isAction ? (
                  <a
                    href={`tel:${enq.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      backgroundColor: enq.badgeBg,
                      color: enq.badgeColor,
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
                    {enq.badgeText}
                  </a>
                ) : (
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
                )}
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

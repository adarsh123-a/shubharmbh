import React from 'react';

const SA_KPIS = [
  {
    id: 'properties',
    label: 'Total Properties',
    value: '128',
    trend: '↑ 12%',
    bgTint: '#E0F2FE',
    iconColor: '#0284C7',
    route: 'properties',
    hasChevron: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    ),
  },
  {
    id: 'enquiries',
    label: 'Total Enquiries',
    value: '342',
    trend: '↑ 18%',
    bgTint: '#DCFCE7',
    iconColor: '#16A34A',
    route: 'enquiries',
    hasChevron: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Total Customers',
    value: '96',
    trend: '↑ 8%',
    bgTint: '#FFEDD5',
    iconColor: '#EA580C',
    route: 'users',
    hasChevron: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
      </svg>
    ),
  },
  {
    id: 'admins',
    label: 'Total Admins',
    value: '24',
    trend: null,
    bgTint: '#F3E8FF',
    iconColor: '#9333EA',
    route: 'users',
    hasChevron: true,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'rms',
    label: 'Total RMs',
    value: '18',
    trend: null,
    bgTint: '#E0F2FE',
    iconColor: '#0284C7',
    route: 'users',
    hasChevron: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'agents',
    label: 'Total Agents',
    value: '320',
    trend: null,
    bgTint: '#FFE4E6',
    iconColor: '#E11D48',
    route: 'users',
    hasChevron: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'revenue',
    label: 'Total Revenue',
    value: '₹ 18.5 L',
    trend: '↑ 15%',
    bgTint: '#FEF3C7',
    iconColor: '#D97706',
    route: 'more',
    hasChevron: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <line x1="18" y1="20" x2="18" y2="10" stroke="currentColor" strokeWidth="2.5"></line>
        <line x1="12" y1="20" x2="12" y2="4" stroke="currentColor" strokeWidth="2.5"></line>
        <line x1="6" y1="20" x2="6" y2="14" stroke="currentColor" strokeWidth="2.5"></line>
      </svg>
    ),
  },
  {
    id: 'bookings',
    label: 'Total Bookings',
    value: '428',
    trend: '↑ 22%',
    bgTint: '#FCE7F3',
    iconColor: '#DB2777',
    route: 'properties',
    hasChevron: false,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
      </svg>
    ),
  },
];

const RECENT_PROPERTIES_LIST = [
  {
    id: 'prop-1',
    title: '3 BHK Independent House',
    location: 'Lucknow, Uttar Pradesh',
    specs: '1600 sq.ft • 3 BHK • 3 Bath',
    price: '₹ 85 Lakh',
    status: 'For Sale',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80',
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
    img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=300&q=80',
  },
];

export default function SuperAdminDashboardView({ onNavigate = () => {} }) {
  return (
    <div className="super-admin-main-content super-admin-dashboard-view">
      {/* 1. Super Admin Hero Banner */}
      <div
        className="super-admin-hero-card gpu-accel"
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
            {/* Crown Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              Super Admin Dashboard
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Complete control over your real estate business
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

      {/* 2. 8 Metric KPI Cards (4 Rows x 2 Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {SA_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="sa-pressable"
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
              {kpi.hasChevron && (
                <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700' }}>›</span>
              )}
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

      {/* 3. Enquiries Overview Chart (Royal Blue theme) */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Enquiries Overview
          </h3>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '4px 8px',
              fontSize: '11px',
              fontWeight: '600',
              color: '#334155',
              cursor: 'pointer',
            }}
          >
            <span>Last 30 Days</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </div>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '14px 10px 10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            position: 'relative',
          }}
        >
          {/* Tooltip Card for Peak at 18 Oct */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '52%',
              transform: 'translateX(-50%)',
              backgroundColor: '#FFFFFF',
              border: '1px solid #E2E8F0',
              borderRadius: '8px',
              padding: '4px 8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
              textAlign: 'center',
              zIndex: 3,
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A', lineHeight: 1.1 }}>
              28 Enquiries
            </div>
            <div style={{ fontSize: '9px', color: '#64748B', marginTop: '1px' }}>
              18 Oct 2026
            </div>
          </div>

          {/* SVG Area Chart (Royal Blue theme matching screenshot) */}
          <svg viewBox="0 0 320 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="superAdminChartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="30" y1="20" x2="310" y2="20" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="50" x2="310" y2="50" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="80" x2="310" y2="80" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="110" x2="310" y2="110" stroke="#F1F5F9" strokeWidth="1" />

            {/* Y Axis Labels */}
            <text x="18" y="23" fontSize="9" fill="#94A3B8" textAnchor="end">40</text>
            <text x="18" y="53" fontSize="9" fill="#94A3B8" textAnchor="end">30</text>
            <text x="18" y="83" fontSize="9" fill="#94A3B8" textAnchor="end">20</text>
            <text x="18" y="113" fontSize="9" fill="#94A3B8" textAnchor="end">10</text>
            <text x="18" y="128" fontSize="9" fill="#94A3B8" textAnchor="end">0</text>

            {/* Area Fill */}
            <path
              d="M 35 110 L 35 112 L 65 96 L 95 82 L 120 102 L 140 92 L 165 60 L 190 76 L 220 104 L 250 86 L 285 102 L 310 82 L 310 125 L 35 125 Z"
              fill="url(#superAdminChartGrad)"
            />

            {/* Blue Trend Line */}
            <path
              d="M 35 112 L 65 96 L 95 82 L 120 102 L 140 92 L 165 60 L 190 76 L 220 104 L 250 86 L 285 102 L 310 82"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Circles */}
            {[
              [35, 112],
              [65, 96],
              [95, 82],
              [120, 102],
              [140, 92],
              [165, 60],
              [190, 76],
              [220, 104],
              [250, 86],
              [285, 102],
              [310, 82],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={cx === 165 ? "4.5" : "2.8"} fill="#FFFFFF" stroke="#2563EB" strokeWidth={cx === 165 ? "2.5" : "1.8"} />
            ))}

            {/* X Axis Labels */}
            <text x="35" y="136" fontSize="8.5" fill="#94A3B8" textAnchor="middle">1 Oct</text>
            <text x="95" y="136" fontSize="8.5" fill="#94A3B8" textAnchor="middle">8 Oct</text>
            <text x="165" y="136" fontSize="8.5" fill="#94A3B8" textAnchor="middle">15 Oct</text>
            <text x="235" y="136" fontSize="8.5" fill="#94A3B8" textAnchor="middle">22 Oct</text>
            <text x="305" y="136" fontSize="8.5" fill="#94A3B8" textAnchor="middle">31 Oct</text>
          </svg>
        </div>
      </div>

      {/* 4. Property Status Donut Breakdown */}
      <div style={{ marginBottom: '22px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 12px', padding: '0 2px' }}>
          Property Status
        </h3>

        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            padding: '16px 14px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
          }}
        >
          {/* Donut Chart with 128 Total in Center */}
          <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              {/* Draft: 30/128 = 23.4% -> strokeDasharray: 58.8 192.6, strokeDashoffset: 0 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#94A3B8" strokeWidth="13" strokeDasharray="58.8 192.6" strokeDashoffset="0" />
              {/* Unavailable: 12/128 = 9.4% -> strokeDasharray: 23.6 227.8, strokeDashoffset: -58.8 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="13" strokeDasharray="23.6 227.8" strokeDashoffset="-58.8" />
              {/* Sold: 18/128 = 14% -> strokeDasharray: 35.3 216.1, strokeDashoffset: -82.4 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0284C7" strokeWidth="13" strokeDasharray="35.3 216.1" strokeDashoffset="-82.4" />
              {/* For Sale: 68/128 = 53.1% -> strokeDasharray: 133.5 117.9, strokeDashoffset: -117.7 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="13" strokeDasharray="133.5 117.9" strokeDashoffset="-117.7" />
            </svg>

            {/* Center Count */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
                128
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>
                Total
              </div>
            </div>
          </div>

          {/* Right Status Breakdown Rows */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'For Sale', count: 68, color: '#10B981' },
              { label: 'Sold', count: 18, color: '#0284C7' },
              { label: 'Unavailable', count: 12, color: '#EF4444' },
              { label: 'Draft', count: 30, color: '#94A3B8' },
            ].map((st) => (
              <div key={st.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: st.color }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#334155' }}>{st.label}</span>
                </div>
                <span style={{ fontSize: '12.5px', fontWeight: '800', color: '#0F172A' }}>{st.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Recent Properties (Exact Match to Screenshot!) */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Recent Properties
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
          {RECENT_PROPERTIES_LIST.map((prop) => (
            <div
              key={prop.id}
              className="sa-pressable"
              onClick={() => onNavigate('properties')}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '10px 12px',
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
                    margin: '0 0 2px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {prop.title}
                </h4>
                <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {prop.location}
                </div>
                <div style={{ fontSize: '9.5px', color: '#94A3B8' }}>
                  {prop.specs}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px', flexShrink: 0 }}>
                <span style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A' }}>
                  {prop.price}
                </span>
                <span
                  style={{
                    backgroundColor: prop.statusBg,
                    color: prop.statusColor,
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {prop.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

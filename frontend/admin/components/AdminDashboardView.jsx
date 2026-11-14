import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService.js';

const ADMIN_KPIS = [
  {
    id: 'properties',
    label: 'Total Properties',
    value: '86',
    trend: '↑ 10%',
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
    label: 'Total Enquiries',
    value: '210',
    trend: '↑ 16%',
    bgTint: '#DCFCE7',
    iconColor: '#16A34A',
    route: 'enquiries',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Total Customers',
    value: '54',
    trend: '↑ 8%',
    bgTint: '#FFEDD5',
    iconColor: '#EA580C',
    route: 'team',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
      </svg>
    ),
  },
  {
    id: 'rms',
    label: 'Total RMs',
    value: '12',
    trend: null,
    bgTint: '#F3E8FF',
    iconColor: '#9333EA',
    route: 'team',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
];

const RECENT_ENQUIRIES_LIST = [
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
  },
];

export default function AdminDashboardView({ onNavigate = () => {} }) {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    let isMounted = true;
    adminService.getDashboard().then((data) => {
      if (isMounted && data) {
        setDashboardData(data);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const getKpiValue = (id, fallback) => {
    if (!dashboardData) return fallback;
    if (id === 'properties') return String(dashboardData.totalLands ?? fallback);
    if (id === 'enquiries') return String(dashboardData.pendingBookings ?? fallback);
    if (id === 'customers') return String(dashboardData.totalAgents ?? fallback);
    if (id === 'rms') return String(dashboardData.totalRMs ?? fallback);
    return fallback;
  };

  return (
    <div className="admin-main-content admin-dashboard-view">
      {/* 1. Admin Hero Banner */}
      <div
        className="admin-hero-card gpu-accel"
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
            {/* Gold Shield Icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              Admin Dashboard
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Master Land Projects & Team Oversight
            </p>
          </div>
        </div>

        {/* Land Management Badge on the Right */}
        <div style={{ zIndex: 2, flexShrink: 0, marginLeft: '8px' }}>
          <div
            style={{
              padding: '6px 12px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.15)',
              border: '1.5px solid rgba(255, 255, 255, 0.25)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: '800',
              textAlign: 'center',
            }}
          >
            <div>📐 Land Console</div>
            <div style={{ fontSize: '9px', opacity: 0.85, marginTop: '2px' }}>Branch Operations</div>
          </div>
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
        {ADMIN_KPIS.map((kpi) => (
          <div
            key={kpi.id}
            className="admin-pressable"
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
                {getKpiValue(kpi.id, kpi.value)}
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

      {/* 3. Enquiries Overview Chart */}
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
          {/* Tooltip Card for Peak */}
          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '46%',
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
              18 Enquiries
            </div>
            <div style={{ fontSize: '9px', color: '#64748B', marginTop: '1px' }}>
              16 Oct 2026
            </div>
          </div>

          {/* SVG Area Chart */}
          <svg viewBox="0 0 320 140" style={{ width: '100%', height: 'auto', display: 'block' }}>
            <defs>
              <linearGradient id="adminChartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
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
              d="M 35 110 L 35 102 L 65 90 L 95 72 L 120 88 L 140 76 L 165 52 L 190 74 L 220 96 L 250 82 L 285 96 L 310 74 L 310 125 L 35 125 Z"
              fill="url(#adminChartGrad)"
            />

            {/* Orange Trend Line */}
            <path
              d="M 35 102 L 65 90 L 95 72 L 120 88 L 140 76 L 165 52 L 190 74 L 220 96 L 250 82 L 285 96 L 310 74"
              fill="none"
              stroke="#F59E0B"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Data Circles */}
            {[
              [35, 102],
              [65, 90],
              [95, 72],
              [120, 88],
              [140, 76],
              [165, 52],
              [190, 74],
              [220, 96],
              [250, 82],
              [285, 96],
              [310, 74],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r={cx === 165 ? "4.5" : "2.8"} fill="#FFFFFF" stroke="#D97706" strokeWidth={cx === 165 ? "2.5" : "1.8"} />
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
          {/* Donut Chart with Total in Center */}
          <div style={{ position: 'relative', width: '110px', height: '110px', flexShrink: 0 }}>
            <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
              {/* Draft: 14/86 = 16.3% -> strokeDasharray: 51.2 262.8, strokeDashoffset: 0 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#94A3B8" strokeWidth="13" strokeDasharray="51.2 262.8" strokeDashoffset="0" />
              {/* Unavailable: 12/86 = 14% -> strokeDasharray: 43.9 270.1, strokeDashoffset: -51.2 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#EF4444" strokeWidth="13" strokeDasharray="43.9 270.1" strokeDashoffset="-51.2" />
              {/* Sold: 18/86 = 20.9% -> strokeDasharray: 65.8 248.2, strokeDashoffset: -95.1 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#0284C7" strokeWidth="13" strokeDasharray="65.8 248.2" strokeDashoffset="-95.1" />
              {/* For Sale: 42/86 = 48.8% -> strokeDasharray: 153.2 160.8, strokeDashoffset: -160.9 */}
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10B981" strokeWidth="13" strokeDasharray="153.2 160.8" strokeDashoffset="-160.9" />
            </svg>

            {/* Donut Center */}
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
                86
              </div>
              <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>
                Total
              </div>
            </div>
          </div>

          {/* Right Status Breakdown Rows */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {[
              { label: 'For Sale', count: 42, color: '#10B981' },
              { label: 'Sold', count: 18, color: '#0284C7' },
              { label: 'Unavailable', count: 12, color: '#EF4444' },
              { label: 'Draft', count: 14, color: '#94A3B8' },
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

      {/* 5. Recent Enquiries */}
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
          {RECENT_ENQUIRIES_LIST.map((enq) => (
            <div
              key={enq.id}
              className="admin-pressable"
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

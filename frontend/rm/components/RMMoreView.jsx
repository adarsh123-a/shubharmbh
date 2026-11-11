import React from 'react';

export default function RMMoreView({ onNavigate = () => {} }) {
  return (
    <div className="rm-main-content rm-more-view">
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          RM Profile & Desk
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Shubharambh Realty Relationship Desk
        </span>
      </div>

      {/* RM Profile Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '14px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80"
          alt="RM Avatar"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #D97706',
          }}
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Ayush Srivastava
          </h3>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            ID: <strong style={{ color: '#0F172A' }}>SR-RM-2026</strong> • Status: <span style={{ color: '#16A34A', fontWeight: '700' }}>Active RM</span>
          </div>
          <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
            Territory: Lucknow & Kanpur Region
          </div>
        </div>
      </div>

      {/* RM Metrics */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '14px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', margin: '0 0 10px' }}>
          Relationship Pipeline (3 Bookings)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>Site Visits Done</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>6 Visits</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>Bookings In Deal</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#9333EA', marginTop: '2px' }}>3 Active</div>
          </div>
        </div>
      </div>

      {/* Company Official Information */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
        }}
      >
        <h4 style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', margin: '0 0 8px' }}>
          🏢 Shubharambh Realty Relationship Desk
        </h4>
        <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
          <div><strong>Support Helpline:</strong> +91 7275004901</div>
          <div><strong>Official Communications:</strong> support@eformx.com</div>
          <div><strong>Branch Office:</strong> 27 Friends Colony, Ramadevi, Kanpur Nagar - 208007</div>
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <button
          type="button"
          onClick={() => onNavigate('dashboard')}
          style={{
            backgroundColor: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '12px',
            padding: '11px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Back to RM Dashboard
        </button>

        <button
          type="button"
          onClick={() => {
            document.cookie = 'user_role=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            window.location.href = '/login';
          }}
          style={{
            backgroundColor: '#FEE2E2',
            color: '#DC2626',
            border: 'none',
            borderRadius: '12px',
            padding: '11px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          Logout Session
        </button>
      </div>
    </div>
  );
}

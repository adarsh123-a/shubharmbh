import React from 'react';

export default function AgentMoreView({ onNavigate = () => {} }) {
  return (
    <div className="agent-main-content agent-more-view">
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Agent Profile & Settings
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Shubharambh Realty Authorized Agent
        </span>
      </div>

      {/* Agent Profile Card */}
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
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80"
          alt="Agent Avatar"
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
            Rishabh Tripathi
          </h3>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            ID: <strong style={{ color: '#0F172A' }}>SR-AGT-2026</strong> • Status: <span style={{ color: '#16A34A', fontWeight: '700' }}>Verified</span>
          </div>
          <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
            Role: Real Estate Agent / Relationship Manager
          </div>
        </div>
      </div>

      {/* Bookings & Commissions Card */}
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
          Bookings & Performance (4 Total)
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>Confirmed Deals</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>1 Closed</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>In Verification</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>3 Pending</div>
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
          🏢 Shubharambh Realty Official Desk
        </h4>
        <div style={{ fontSize: '11px', color: '#475569', lineHeight: 1.6 }}>
          <div><strong>Support Phone:</strong> +91 7275004901</div>
          <div><strong>Official Email:</strong> support@eformx.com</div>
          <div><strong>Head Office:</strong> 27 Friends Colony, Ramadevi, Kanpur Nagar, UP - 208007</div>
          <div><strong>RERA:</strong> UPRERA-REG-2026-SR001</div>
        </div>
      </div>

      {/* Action Links */}
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
          Back to Dashboard
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

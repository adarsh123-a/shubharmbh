import React from 'react';

export default function AdminMoreView({ onNavigate = () => {} }) {
  return (
    <div className="admin-main-content admin-more-view">
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Admin Desk & Controls
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Shubharambh Realty Operations Center
        </span>
      </div>

      {/* Admin Profile Card */}
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
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=140&q=80"
          alt="Admin Avatar"
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
            Operations Head
          </h3>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            ID: <strong style={{ color: '#0F172A' }}>SR-ADM-001</strong> • Authority: <span style={{ color: '#16A34A', fontWeight: '700' }}>Supervisory</span>
          </div>
          <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
            Jurisdiction: Lucknow Division & Kanpur Region
          </div>
        </div>
      </div>

      {/* Admin Operational Summary */}
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
          Operations Overview
        </h4>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>Active Properties</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>42 Live</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '600' }}>Pending Verification</span>
            <div style={{ fontSize: '18px', fontWeight: '800', color: '#D97706', marginTop: '2px' }}>14 Drafts</div>
          </div>
        </div>
      </div>

      {/* Official Company Details from information.md */}
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
          <div><strong>Official Communications:</strong> support@eformx.com</div>
          <div><strong>Head Office:</strong> 27 Friends Colony, Ramadevi, Kanpur Nagar, UP - 208007</div>
          <div><strong>RERA:</strong> UPRERA-REG-2026-SR001</div>
        </div>
      </div>

      {/* Action Buttons */}
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
          Back to Admin Dashboard
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

import React from 'react';

export default function CustomerProfileView({
  wishlistCount = 3,
  onNavigateTab = () => { },
}) {
  const handleLogout = async () => {
    try {
      await fetch('http://localhost:5000/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      });
    } catch {
      // Ignore network errors on logout
    }
    // Clear cookies & reload to login
    document.cookie = 'token=; Max-Age=0; path=/;';
    document.cookie = 'user_role=; Max-Age=0; path=/;';
    window.location.href = '../login/index.html';
  };

  return (
    <div className="tab-content-view customer-profile-view" style={{ padding: '16px 16px 80px' }}>
      {/* 1. Profile Header Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '18px',
          padding: '18px',
          border: '1px solid #E2E8F0',
          boxShadow: '0 2px 10px rgba(15, 23, 42, 0.04)',
          marginBottom: '14px',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: '#FEF3C7',
            color: '#B45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            fontWeight: '800',
            border: '2px solid #F59E0B',
            flexShrink: 0,
          }}
        >
          SP
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
            <h2 style={{ fontSize: '17px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Satyam Patel
            </h2>
            <span
              style={{
                fontSize: '11px',
                fontWeight: '700',
                color: '#16A34A',
                background: '#DCFCE7',
                padding: '2px 8px',
                borderRadius: '6px',
              }}
            >
              ✓ Verified
            </span>
          </div>
          <p style={{ fontSize: '12px', color: '#64748B', margin: '3px 0 0' }}>
            ID: <strong style={{ color: '#0F172A' }}>SR-CUST-2026</strong> • Customer
          </p>
          <p style={{ fontSize: '11px', color: '#94A3B8', margin: '2px 0 0' }}>
            Member since Oct 2026
          </p>
        </div>
      </div>

      {/* 2. Quick Activity Summary Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '14px',
        }}
      >
        <div
          onClick={() => onNavigateTab('dashboard')}
          style={{
            background: '#FFFFFF',
            padding: '12px 10px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>My Bookings</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#2563EB', marginTop: '4px' }}>
            1 Confirmed
          </div>
          <span style={{ fontSize: '10px', color: '#3B82F6', fontWeight: '700' }}>View order →</span>
        </div>

        <div
          onClick={() => onNavigateTab('dashboard')}
          style={{
            background: '#FFFFFF',
            padding: '12px 10px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>My Queries</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#EA580C', marginTop: '4px' }}>
            3 Active
          </div>
          <span style={{ fontSize: '10px', color: '#F97316', fontWeight: '700' }}>Track status →</span>
        </div>

        <div
          onClick={() => onNavigateTab('dashboard')}
          style={{
            background: '#FFFFFF',
            padding: '12px 10px',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            cursor: 'pointer',
            transition: 'transform 0.15s ease',
          }}
        >
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Site Visits</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#16A34A', marginTop: '4px' }}>
            1 Scheduled
          </div>
          <span style={{ fontSize: '10px', color: '#16A34A', fontWeight: '700' }}>Details →</span>
        </div>
      </div>

      {/* 3. Personal Contact Details */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #E2E8F0',
          marginBottom: '14px',
        }}
      >
        <h3 style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', margin: '0 0 12px' }}>
          Account Details
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '12.5px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ color: '#64748B' }}>Mobile Number</span>
            <strong style={{ color: '#0F172A' }}>+91 7275004901</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ color: '#64748B' }}>Email</span>
            <strong style={{ color: '#0F172A' }}>support@eformx.com</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #F1F5F9' }}>
            <span style={{ color: '#64748B' }}>Primary City</span>
            <strong style={{ color: '#0F172A' }}>Lucknow, UP</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: '#64748B' }}>Saved Properties</span>
            <strong style={{ color: '#0F172A' }}>{wishlistCount} in Wishlist</strong>
          </div>
        </div>
      </div>

      {/* 4. Dedicated Relationship Manager Card */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #E2E8F0',
          marginBottom: '14px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <div>
            <span style={{ fontSize: '10.5px', fontWeight: '800', color: '#B45309', textTransform: 'uppercase' }}>
              Your Support Desk
            </span>
            <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: '2px 0 0' }}>
              Dedicated Relationship Manager
            </h3>
          </div>
          <span style={{ fontSize: '11px', background: '#FEF3C7', color: '#B45309', padding: '3px 8px', borderRadius: '6px', fontWeight: '700' }}>
            Assigned
          </span>
        </div>

        <p style={{ fontSize: '12px', color: '#64748B', margin: '0 0 14px', lineHeight: 1.45 }}>
          Kisi bhi query, site visit reschedule, ya allotment process ke liye direct contact karein.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <a
            href="tel:+917275004901"
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              padding: '11px',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            Call Manager
          </a>

          <a
            href="https://wa.me/917275004901?text=नमस्ते%20Shubharambh%20Realty,%20मुझे%20मेरी%20बुकिंग%20व%20साइट%20विज़िट%20के%20बारे%20में%20जानकारी%20चाहिए।"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              background: '#25D366',
              color: '#FFFFFF',
              padding: '11px',
              borderRadius: '12px',
              textAlign: 'center',
              textDecoration: 'none',
              fontSize: '12.5px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            WhatsApp
          </a>
        </div>
      </div>

      {/* 5. Office Address & Logout */}
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '16px',
          padding: '14px 16px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
          fontSize: '11.5px',
          color: '#64748B',
          lineHeight: 1.5,
        }}
      >
        <strong style={{ color: '#0F172A' }}>Shubharambh Realty Office:</strong>
        <br />
        27 Friends Colony, Ramadevi, Kanpur Nagar, UP - 208007
      </div>

      <button
        type="button"
        onClick={handleLogout}
        style={{
          width: '100%',
          padding: '13px',
          borderRadius: '14px',
          border: '1px solid #FEE2E2',
          background: '#FEF2F2',
          color: '#DC2626',
          fontSize: '13.5px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
        }}
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Sign Out / Logout
      </button>
    </div>
  );
}


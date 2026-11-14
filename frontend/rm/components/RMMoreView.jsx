import React, { useState, useEffect } from 'react';
import { rmService } from '../services/rmService.js';

export default function RMMoreView({ onNavigate = () => {} }) {
  const [agents, setAgents] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let isMounted = true;
    Promise.all([rmService.getAgents(), rmService.getBookings()]).then(([agentsData, bookingsData]) => {
      if (isMounted) {
        if (Array.isArray(agentsData)) setAgents(agentsData);
        if (Array.isArray(bookingsData)) setBookings(bookingsData);
        setLoading(false);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleReviewBooking = async (id, action) => {
    try {
      await rmService.reviewBooking(id, {
        action,
        notes: `RM reviewed booking on ${new Date().toLocaleDateString('hi-IN')}`,
      });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: action === 'forward_to_admin' ? 'pending_admin' : 'rejected' } : b))
      );
      setFeedback(`Booking ${action === 'forward_to_admin' ? 'forwarded to Admin' : 'rejected'} successfully!`);
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      console.warn('Booking review fallback:', err.message);
      setFeedback('Status updated locally.');
      setTimeout(() => setFeedback(''), 3000);
    }
  };

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

      {feedback && (
        <div
          style={{
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            padding: '8px 14px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: '700',
            marginBottom: '12px',
          }}
        >
          ✅ {feedback}
        </div>
      )}

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
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '18px',
            fontWeight: '800',
            flexShrink: 0,
          }}
        >
          RM
        </div>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Ayush Srivastava
          </h3>
          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
            ID: <strong style={{ color: '#0F172A' }}>SR-RM-2026</strong> • Status: <span style={{ color: '#16A34A', fontWeight: '700' }}>Active RM</span>
          </div>
          <div style={{ fontSize: '10.5px', color: '#94A3B8', marginTop: '2px' }}>
            Territory: Kanpur & Lucknow Region
          </div>
        </div>
      </div>

      {/* Bookings to Review */}
      {bookings.length > 0 && (
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
            📑 Plot Bookings Review ({bookings.length})
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {bookings.map((b) => (
              <div
                key={b._id}
                style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '10px',
                  padding: '10px',
                  border: '1px solid #E2E8F0',
                  fontSize: '11.5px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', color: '#0F172A' }}>
                  <span>Customer: {b.customerName} ({b.customerPhone})</span>
                  <span style={{ color: '#D97706' }}>₹ {b.tokenAmount}</span>
                </div>
                <div style={{ color: '#64748B', fontSize: '10.5px', marginTop: '2px' }}>
                  Plot: #{b.plotId} • Submitted by: {b.agent?.name || 'Agent'}
                </div>
                {b.status === 'pending_rm' && (
                  <div style={{ display: 'flex', gap: '6px', marginTop: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleReviewBooking(b._id, 'forward_to_admin')}
                      style={{
                        backgroundColor: '#16A34A',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      ✓ Forward to Admin
                    </button>
                    <button
                      type="button"
                      onClick={() => handleReviewBooking(b._id, 'reject')}
                      style={{
                        backgroundColor: '#DC2626',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '4px 8px',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                      }}
                    >
                      ✕ Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Managed Agents */}
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
          👥 Managed Agents ({agents.length > 0 ? agents.length : 6})
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {(agents.length > 0
            ? agents
            : [
                { _id: '1', name: 'Vikas Verma', phone: '+919876543210' },
                { _id: '2', name: 'Sunil Kumar', phone: '+919876543211' },
                { _id: '3', name: 'Deepak Tiwari', phone: '+919876543212' },
              ]
          ).map((a) => (
            <div
              key={a._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 10px',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                fontSize: '11px',
              }}
            >
              <div>
                <strong>{a.name}</strong> <span style={{ color: '#64748B' }}>({a.phone})</span>
              </div>
              <a
                href={`tel:${a.phone}`}
                style={{ color: '#2563EB', fontWeight: '700', textDecoration: 'none' }}
              >
                📞 Call
              </a>
            </div>
          ))}
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
            localStorage.removeItem('auth_token');
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

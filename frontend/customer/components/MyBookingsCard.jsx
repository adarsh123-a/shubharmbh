import React from 'react';

export default function MyBookingsCard({ onViewReceipt }) {
  return (
    <section className="tracker-container" style={{ paddingTop: 0 }}>
      <div className="booking-card gpu-accel">
        <div className="booking-header">
          <div className="booking-id-tag">
            <span>🏷️</span>
            <span>Booking #SB12345</span>
          </div>
          <span className="status-badge status-new">✓ Confirmed</span>
        </div>

        <div className="booking-details-grid">
          <div className="booking-detail-item">
            <span className="booking-label">Property Unit</span>
            <span className="booking-val">3 BHK Villa (Unit 12B)</span>
          </div>
          <div className="booking-detail-item">
            <span className="booking-label">Booking Date</span>
            <span className="booking-val">02 Oct 2026</span>
          </div>
          <div className="booking-detail-item">
            <span className="booking-label">Token Advance</span>
            <span className="booking-val" style={{ color: 'var(--price-blue)' }}>₹ 5,00,000 Paid</span>
          </div>
          <div className="booking-detail-item">
            <span className="booking-label">Possession Due</span>
            <span className="booking-val">Dec 2026</span>
          </div>
        </div>

        <button 
          className="enquire-action-btn" 
          style={{ width: '100%', background: 'linear-gradient(135deg, #0F172A, #1E293B)' }}
          onClick={onViewReceipt}
        >
          <span>Download Allotment Receipt</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" x2="12" y1="15" y2="3"></line>
          </svg>
        </button>
      </div>
    </section>
  );
}

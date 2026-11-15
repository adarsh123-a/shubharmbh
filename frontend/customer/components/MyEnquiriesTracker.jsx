import React from 'react';

export default function MyEnquiriesTracker({ onViewAll }) {
  const enquiries = [];

  return (
    <section className="tracker-container">
      <div className="section-header">
        <h2 className="section-title">My Enquiries</h2>
        <button className="section-action" onClick={onViewAll}>
          View History
        </button>
      </div>

      <div className="enquiries-list">
        {enquiries.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '24px 12px', color: '#64748B', fontSize: '13px' }}>
            No enquiries submitted yet.
          </div>
        ) : (
          enquiries.map((enq) => (
            <div key={enq.id} className="enquiry-card-item gpu-accel">
              <div className="enquiry-left">
                <span className="enquiry-name">{enq.property}</span>
                <span className="enquiry-date">Submitted on {enq.date}</span>
              </div>
              <span className={`status-badge ${enq.badgeClass}`}>{enq.status}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

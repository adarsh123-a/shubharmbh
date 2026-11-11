import React from 'react';

const ENQUIRIES = [
  {
    id: 'e1',
    property: '3 BHK in Gomti Nagar',
    date: '12 Oct 2026',
    status: 'New',
    badgeClass: 'status-new',
  },
  {
    id: 'e2',
    property: 'Plot in Faizabad Road',
    date: '10 Oct 2026',
    status: 'Interested',
    badgeClass: 'status-interested',
  },
  {
    id: 'e3',
    property: '2 BHK Apartment',
    date: '08 Oct 2026',
    status: 'Site Visit',
    badgeClass: 'status-site-visit',
  },
];

export default function MyEnquiriesTracker({ onViewAll }) {
  return (
    <section className="tracker-container">
      <div className="section-header">
        <h2 className="section-title">My Enquiries</h2>
        <button className="section-action" onClick={onViewAll}>
          View History
        </button>
      </div>

      <div className="enquiries-list">
        {ENQUIRIES.map((enq) => (
          <div key={enq.id} className="enquiry-card-item gpu-accel">
            <div className="enquiry-left">
              <span className="enquiry-name">{enq.property}</span>
              <span className="enquiry-date">Submitted on {enq.date}</span>
            </div>
            <span className={`status-badge ${enq.badgeClass}`}>{enq.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

import React, { useState } from 'react';
import RMScheduleVisitModal from './RMScheduleVisitModal.jsx';

const SITE_VISITS_LIST = [
  {
    id: 'visit-1',
    time: 'Today • 10:00 AM',
    client: 'Rahul Sharma',
    phone: '+917275004901',
    property: '3 BHK Independent House',
    location: 'Gomti Nagar, Lucknow',
    status: 'Upcoming',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'visit-2',
    time: 'Today • 02:30 PM',
    client: 'Amit Mishra',
    phone: '+917275004901',
    property: 'Residential Plot Scheme',
    location: 'Faizabad Road, Lucknow',
    status: 'Upcoming',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'visit-3',
    time: 'Tomorrow • 11:30 AM',
    client: 'Vikash Singh',
    phone: '+917275004901',
    property: '4 BHK Luxury Villa',
    location: 'Sushant Golf City, Lucknow',
    status: 'Confirmed',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
  },
  {
    id: 'visit-4',
    time: '28 Oct • 03:00 PM',
    client: 'Dr. Alok Srivastava',
    phone: '+917275004901',
    property: 'Commercial Retail Complex',
    location: 'Hazratganj, Lucknow',
    status: 'Pending Confirmation',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
  },
];

export default function RMVisitsView() {
  const [visitsList, setVisitsList] = useState(SITE_VISITS_LIST);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const handleScheduleVisit = (newVisit) => {
    setVisitsList((prev) => [newVisit, ...prev]);
    setNotice(`Site visit for ${newVisit.client} scheduled successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleOpenDirections = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ', Lucknow')}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="rm-main-content rm-visits-view">
      {notice && (
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
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✅ {notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer', fontWeight: '800' }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Site Visits Schedule
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {visitsList.length} Total Scheduled Property Walkthroughs
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsScheduleOpen(true)}
          style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          + Schedule
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {visitsList.map((visit) => (
          <div
            key={visit.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '13px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#B45309' }}>
                🕒 {visit.time}
              </span>
              <span
                style={{
                  backgroundColor: visit.statusBg,
                  color: visit.statusColor,
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {visit.status}
              </span>
            </div>

            <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: '0 0 2px' }}>
              {visit.client}
            </h4>
            <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '2px' }}>
              🏡 {visit.property}
            </div>
            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginBottom: '10px' }}>
              📍 {visit.location}
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <a
                href={`tel:${visit.phone}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                📞 Call Client
              </a>
              <button
                type="button"
                onClick={() => handleOpenDirections(visit.location)}
                style={{
                  flex: 1,
                  backgroundColor: '#F1F5F9',
                  color: '#0F172A',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                🗺️ Directions
              </button>
            </div>
          </div>
        ))}
      </div>

      <RMScheduleVisitModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        onScheduleVisit={handleScheduleVisit}
      />
    </div>
  );
}

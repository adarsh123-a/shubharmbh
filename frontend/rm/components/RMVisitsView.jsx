import React, { useState, useEffect } from 'react';
import RMScheduleVisitModal from './RMScheduleVisitModal.jsx';
import { rmService } from '../services/rmService.js';

const INITIAL_VISITS_LIST = [
  {
    id: 'visit-1',
    time: 'Today • 10:00 AM',
    client: 'Rahul Sharma',
    phone: '+917275004901',
    property: 'एयरपोर्ट चकेरी साइट (Plot #14)',
    location: 'चकेरी, कानपुर',
    driver: 'Ramesh (UP78-AB-1234)',
    status: 'Upcoming',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'visit-2',
    time: 'Today • 02:30 PM',
    client: 'Amit Mishra',
    phone: '+917275004901',
    property: 'अवध ग्रीन सिटी लैंड प्रोजेक्ट',
    location: 'सुल्तानपुर रोड, लखनऊ',
    driver: 'Suresh (UP32-CD-5678)',
    status: 'Upcoming',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'visit-3',
    time: 'Tomorrow • 11:30 AM',
    client: 'Vikash Singh',
    phone: '+917275004901',
    property: 'कानपुर रोड आवासीय प्लॉट्स',
    location: 'सरोजिनी नगर, लखनऊ',
    driver: 'Pending Dispatch',
    status: 'Confirmed',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
  },
];

export default function RMVisitsView() {
  const [visitsList, setVisitsList] = useState(INITIAL_VISITS_LIST);
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [notice, setNotice] = useState('');

  // Fetch live visits
  useEffect(() => {
    let isMounted = true;
    rmService.getVisits().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((v) => {
          const statusMap = {
            pending: { label: 'Pending Cab', bg: '#FEF3C7', color: '#D97706' },
            confirmed: { label: 'Confirmed', bg: '#DBEAFE', color: '#2563EB' },
            completed: { label: 'Completed', bg: '#DCFCE7', color: '#16A34A' },
            cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#DC2626' },
          };
          const st = statusMap[v.status] || { label: v.status, bg: '#F1F5F9', color: '#64748B' };

          return {
            id: v._id,
            time: v.visitDate ? new Date(v.visitDate).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Scheduled',
            client: v.customer?.name || 'Customer',
            phone: v.customer?.phone || '+917275004901',
            property: v.property ? `Land Scheme #${v.property}` : 'Plot Site Visit',
            location: v.pickupLocation || 'Kanpur / Lucknow Site',
            driver: v.driverName ? `${v.driverName} (${v.driverPhone || ''})` : 'Self / Pending Cab',
            status: st.label,
            statusBg: st.bg,
            statusColor: st.color,
          };
        });
        setVisitsList(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleScheduleVisit = (newVisit) => {
    setVisitsList((prev) => [newVisit, ...prev]);
    setNotice(`Site visit for ${newVisit.client} scheduled successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleMarkCompleted = async (visitId) => {
    try {
      await rmService.updateVisitStatus(visitId, { status: 'completed' });
    } catch (err) {
      console.warn('Fallback update:', err.message);
    }
    setVisitsList((prev) =>
      prev.map((v) => (v.id === visitId ? { ...v, status: 'Completed', statusBg: '#DCFCE7', statusColor: '#16A34A' } : v))
    );
    setNotice('Visit marked as Completed!');
    setTimeout(() => setNotice(''), 3000);
  };

  const handleOpenDirections = (location) => {
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location + ', Uttar Pradesh')}`;
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
            Site Visits & Cab Schedule
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {visitsList.length} Accompanied Land Site Visits
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
              🏞️ {visit.property}
            </div>
            <div style={{ fontSize: '10.5px', color: '#64748B', marginBottom: '4px' }}>
              📍 Pickup: {visit.location}
            </div>
            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginBottom: '10px' }}>
              🚖 Cab: {visit.driver}
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
              {visit.status !== 'Completed' && (
                <button
                  type="button"
                  onClick={() => handleMarkCompleted(visit.id)}
                  style={{
                    flex: 1,
                    backgroundColor: '#DCFCE7',
                    color: '#16A34A',
                    border: 'none',
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '6px 0',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  ✓ Complete
                </button>
              )}
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

import React, { useState } from 'react';

const INITIAL_SA_NOTIFS = [
  {
    id: 'san1',
    title: 'Platform Revenue Milestone',
    desc: 'Monthly gross bookings revenue hit ₹18.5 L (+15% MoM).',
    tag: 'Revenue',
    tagBg: '#DCFCE7',
    tagColor: '#16A34A',
    time: '5m ago',
    unread: true,
  },
  {
    id: 'san2',
    title: 'Traffic & Enquiry Surge',
    desc: '28 customer enquiries logged across portals today.',
    tag: 'Traffic Surge',
    tagBg: '#DBEAFE',
    tagColor: '#2563EB',
    time: '30m ago',
    unread: true,
  },
  {
    id: 'san3',
    title: '428 Total Bookings Confirmed',
    desc: 'Platform cumulative verified tokens and bookings passed 428 mark.',
    tag: 'Bookings',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
    time: '2h ago',
    unread: true,
  },
  {
    id: 'san4',
    title: 'New RM Hierarchy Registered',
    desc: 'Ayush Srivastava onboarded under Kanpur Cluster with 12 active leads.',
    tag: 'Hierarchy',
    tagBg: '#F3E8FF',
    tagColor: '#9333EA',
    time: '5h ago',
    unread: true,
  },
  {
    id: 'san5',
    title: 'Audit Log Archive Ready',
    desc: 'Weekly security, role changes, and inventory logs archived safely.',
    tag: 'Audit',
    tagBg: '#F1F5F9',
    tagColor: '#475569',
    time: '1d ago',
    unread: false,
  },
];

export default function SuperAdminNotificationDrawer({ isOpen, onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_SA_NOTIFS);

  if (!isOpen) return null;

  const unreadCount = notifs.filter((n) => n.unread).length;

  const markAllRead = () => {
    setNotifs((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const toggleNotif = (id) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: !n.unread } : n))
    );
  };

  return (
    <>
      <div className="sa-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="sa-notification-drawer" role="dialog" aria-modal="true" aria-label="Super Admin Notifications">
        <div className="sa-notif-header">
          <div className="sa-notif-title-wrap">
            <span style={{ fontSize: '15px', fontWeight: '700' }}>Executive Alerts</span>
            {unreadCount > 0 && (
              <span className="sa-notif-badge-count">{unreadCount}</span>
            )}
          </div>
          <button
            type="button"
            className="sa-drawer-close-btn"
            onClick={onClose}
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        <div className="sa-notif-body">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`sa-notif-card ${n.unread ? 'unread' : ''}`}
              onClick={() => toggleNotif(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="sa-notif-card-header">
                <span
                  className="sa-notif-tag"
                  style={{ backgroundColor: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="sa-notif-time">{n.time}</span>
              </div>
              <div className="sa-notif-title">{n.title}</div>
              <div className="sa-notif-desc">{n.desc}</div>
            </div>
          ))}
        </div>

        <div className="sa-notif-actions">
          <button type="button" className="sa-notif-btn" onClick={markAllRead}>
            ✓ Mark all as read
          </button>
          <span style={{ fontSize: '11px', color: '#94A3B8' }}>
            {unreadCount === 0 ? 'All caught up' : `${unreadCount} unread`}
          </span>
        </div>
      </aside>
    </>
  );
}

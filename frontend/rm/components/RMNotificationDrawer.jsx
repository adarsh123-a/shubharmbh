import React, { useState } from 'react';

const INITIAL_RM_NOTIFS = [
  {
    id: 'rn1',
    title: 'Site Visit Today',
    desc: 'Rahul Sharma scheduled site visit for 3 BHK in Gomti Nagar at 10:00 AM.',
    tag: 'Visit Today',
    tagBg: '#DCFCE7',
    tagColor: '#16A34A',
    time: '20m ago',
    unread: true,
  },
  {
    id: 'rn2',
    title: 'Client Request Received',
    desc: 'Preeti Kumar requested budget discussion call for Faizabad Road plot.',
    tag: 'Call Request',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
    time: '1h ago',
    unread: true,
  },
  {
    id: 'rn3',
    title: 'Follow-up Due',
    desc: 'Follow-up due for Amitabh Gupta regarding 3 BHK House brochure.',
    tag: 'Follow-up',
    tagBg: '#DBEAFE',
    tagColor: '#2563EB',
    time: '4h ago',
    unread: false,
  },
  {
    id: 'rn4',
    title: 'High-Intent Lead Assigned',
    desc: 'Admin assigned high-intent customer Sunita Verma to your desk.',
    tag: 'Lead Assigned',
    tagBg: '#F3E8FF',
    tagColor: '#9333EA',
    time: '1d ago',
    unread: false,
  },
];

export default function RMNotificationDrawer({ isOpen, onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_RM_NOTIFS);

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
      <div className="rm-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="rm-notification-drawer" role="dialog" aria-modal="true" aria-label="RM Notifications">
        <div className="rm-notif-header">
          <div className="rm-notif-title-wrap">
            <span style={{ fontSize: '15px', fontWeight: '700' }}>Notifications</span>
            {unreadCount > 0 && (
              <span className="rm-notif-badge-count">{unreadCount}</span>
            )}
          </div>
          <button
            type="button"
            className="rm-drawer-close-btn"
            onClick={onClose}
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        <div className="rm-notif-body">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`rm-notif-card ${n.unread ? 'unread' : ''}`}
              onClick={() => toggleNotif(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="rm-notif-card-header">
                <span
                  className="rm-notif-tag"
                  style={{ backgroundColor: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="rm-notif-time">{n.time}</span>
              </div>
              <div className="rm-notif-title">{n.title}</div>
              <div className="rm-notif-desc">{n.desc}</div>
            </div>
          ))}
        </div>

        <div className="rm-notif-actions">
          <button type="button" className="rm-notif-btn" onClick={markAllRead}>
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

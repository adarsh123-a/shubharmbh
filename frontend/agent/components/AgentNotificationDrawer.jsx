import React, { useState } from 'react';

const INITIAL_AGENT_NOTIFS = [
  {
    id: 'an1',
    title: 'New Enquiry Assigned',
    desc: 'Vikash Singh submitted enquiry for 3 BHK Luxury Villa.',
    tag: 'Direct Lead',
    tagBg: '#DCFCE7',
    tagColor: '#16A34A',
    time: '15m ago',
    unread: true,
  },
  {
    id: 'an2',
    title: 'Booking Token Verified',
    desc: 'Finance verified ₹51,000 token for Amit Verma (Plot #42).',
    tag: 'Verified Token',
    tagBg: '#DBEAFE',
    tagColor: '#2563EB',
    time: '1h ago',
    unread: true,
  },
  {
    id: 'an3',
    title: 'Site Visit Confirmed',
    desc: 'Site visit confirmed with Priya Sen for tomorrow at 11:00 AM.',
    tag: 'Schedule',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
    time: '3h ago',
    unread: false,
  },
  {
    id: 'an4',
    title: 'Price Update Notice',
    desc: 'Base rate revised for Gomti Greens Phase-2 to ₹2,800/sq.ft.',
    tag: 'Rate Alert',
    tagBg: '#F3E8FF',
    tagColor: '#9333EA',
    time: '1d ago',
    unread: false,
  },
];

export default function AgentNotificationDrawer({ isOpen, onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_AGENT_NOTIFS);

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
      <div className="agent-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="agent-notification-drawer" role="dialog" aria-modal="true" aria-label="Agent Notifications">
        <div className="agent-notif-header">
          <div className="agent-notif-title-wrap">
            <span style={{ fontSize: '15px', fontWeight: '700' }}>Notifications</span>
            {unreadCount > 0 && (
              <span className="agent-notif-badge-count">{unreadCount}</span>
            )}
          </div>
          <button
            type="button"
            className="agent-drawer-close-btn"
            onClick={onClose}
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        <div className="agent-notif-body">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`agent-notif-card ${n.unread ? 'unread' : ''}`}
              onClick={() => toggleNotif(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="agent-notif-card-header">
                <span
                  className="agent-notif-tag"
                  style={{ backgroundColor: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="agent-notif-time">{n.time}</span>
              </div>
              <div className="agent-notif-title">{n.title}</div>
              <div className="agent-notif-desc">{n.desc}</div>
            </div>
          ))}
        </div>

        <div className="agent-notif-actions">
          <button type="button" className="agent-notif-btn" onClick={markAllRead}>
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

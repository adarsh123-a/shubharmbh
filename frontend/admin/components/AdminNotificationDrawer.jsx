import React, { useState } from 'react';

const INITIAL_ADMIN_NOTIFS = [
  {
    id: 'n1',
    title: 'New High-Value Enquiry',
    desc: 'Rahul Sharma submitted enquiry for 3 BHK in Gomti Nagar.',
    tag: 'Enquiry',
    tagBg: '#DCFCE7',
    tagColor: '#16A34A',
    time: '10m ago',
    unread: true,
  },
  {
    id: 'n2',
    title: 'Draft Property Review',
    desc: '2 new draft properties submitted by Agent Vikash for admin review.',
    tag: 'Approval',
    tagBg: '#FEF3C7',
    tagColor: '#D97706',
    time: '45m ago',
    unread: true,
  },
  {
    id: 'n3',
    title: 'Site Visit Completed',
    desc: 'RM Ayush Srivastava marked site visit completed for Preeti Kumar.',
    tag: 'RM Visit',
    tagBg: '#DBEAFE',
    tagColor: '#2563EB',
    time: '2h ago',
    unread: true,
  },
  {
    id: 'n4',
    title: 'Lead Influx Alert',
    desc: '18 new enquiries reached peak on 16 Oct across Kanpur zones.',
    tag: 'Metrics',
    tagBg: '#F3E8FF',
    tagColor: '#9333EA',
    time: '1d ago',
    unread: false,
  },
  {
    id: 'n5',
    title: 'RM Performance SLA',
    desc: 'RM Team completed 85% follow-up calls within 1 hour SLA.',
    tag: 'Team',
    tagBg: '#E0E7FF',
    tagColor: '#4F46E5',
    time: '2d ago',
    unread: false,
  },
  {
    id: 'n6',
    title: 'System Compliance Notice',
    desc: 'UPRERA registration documents verified for Phase-II projects.',
    tag: 'Compliance',
    tagBg: '#F1F5F9',
    tagColor: '#475569',
    time: '3d ago',
    unread: false,
  },
];

export default function AdminNotificationDrawer({ isOpen, onClose }) {
  const [notifs, setNotifs] = useState(INITIAL_ADMIN_NOTIFS);

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
      <div className="admin-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="admin-notification-drawer" role="dialog" aria-modal="true" aria-label="Admin Notifications">
        <div className="admin-notif-header">
          <div className="admin-notif-title-wrap">
            <span style={{ fontSize: '15px', fontWeight: '700' }}>Notifications</span>
            {unreadCount > 0 && (
              <span className="admin-notif-badge-count">{unreadCount}</span>
            )}
          </div>
          <button
            type="button"
            className="admin-drawer-close-btn"
            onClick={onClose}
            aria-label="Close notifications"
          >
            ✕
          </button>
        </div>

        <div className="admin-notif-body">
          {notifs.map((n) => (
            <div
              key={n.id}
              className={`admin-notif-card ${n.unread ? 'unread' : ''}`}
              onClick={() => toggleNotif(n.id)}
              style={{ cursor: 'pointer' }}
            >
              <div className="admin-notif-card-header">
                <span
                  className="admin-notif-tag"
                  style={{ backgroundColor: n.tagBg, color: n.tagColor }}
                >
                  {n.tag}
                </span>
                <span className="admin-notif-time">{n.time}</span>
              </div>
              <div className="admin-notif-title">{n.title}</div>
              <div className="admin-notif-desc">{n.desc}</div>
            </div>
          ))}
        </div>

        <div className="admin-notif-actions">
          <button type="button" className="admin-notif-btn" onClick={markAllRead}>
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

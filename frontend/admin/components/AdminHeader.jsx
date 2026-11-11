import React from 'react';

export default function AdminHeader({ onMenuClick, onNotificationClick, onProfileClick }) {
  return (
    <header className="admin-header gpu-accel">
      <div className="admin-header-left">
        <button
          type="button"
          className="admin-icon-btn"
          onClick={onMenuClick}
          aria-label="Toggle Navigation Menu"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <img
          src="./assets/logo.png"
          alt="Shubharambh Realty"
          className="admin-brand-logo"
          onError={(e) => {
            e.currentTarget.src = '../docs/logo.png';
          }}
        />
      </div>

      <div className="admin-header-right">
        <div className="admin-bell-wrap" onClick={onNotificationClick} role="button" tabIndex={0}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="admin-bell-badge">6</span>
        </div>

        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80"
          alt="Admin Profile"
          className="admin-profile-avatar"
          onClick={onProfileClick}
        />

        <div className="admin-role-pill" onClick={onProfileClick}>
          <span>Admin</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}

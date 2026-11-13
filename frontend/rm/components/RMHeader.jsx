import React from 'react';
import logoImg from '../../customer/assets/logo.png';

export default function RMHeader({ onMenuClick, onNotificationClick, onProfileClick }) {
  return (
    <header className="rm-header gpu-accel">
      <div className="rm-header-left">
        <button
          type="button"
          className="rm-icon-btn"
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
          src={logoImg}
          alt="Shubharambh Realty"
          className="rm-brand-logo"
          onError={(e) => {
            e.currentTarget.onerror = null;
          }}
        />
      </div>

      <div className="rm-header-right">
        <div className="rm-bell-wrap" onClick={onNotificationClick} role="button" tabIndex={0}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="rm-bell-badge">2</span>
        </div>

        <img
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
          alt="RM Profile"
          className="rm-profile-avatar"
          onClick={onProfileClick}
        />

        <div className="rm-role-pill" onClick={onProfileClick}>
          <span>RM</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </header>
  );
}

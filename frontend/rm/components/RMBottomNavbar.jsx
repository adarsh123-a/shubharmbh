import React from 'react';

const RM_NAV_TABS = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    ),
  },
  {
    id: 'enquiries',
    label: 'Enquiries',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <line x1="8" y1="9" x2="16" y2="9"></line>
        <line x1="8" y1="13" x2="13" y2="13"></line>
      </svg>
    ),
  },
  {
    id: 'customers',
    label: 'Customers',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
        <circle cx="9" cy="7" r="4"></circle>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
      </svg>
    ),
  },
  {
    id: 'visits',
    label: 'Visits',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
        <path d="M9 16l2 2 4-4"></path>
      </svg>
    ),
  },
  {
    id: 'more',
    label: 'More',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="2.2"></circle>
        <circle cx="19" cy="12" r="2.2"></circle>
        <circle cx="5" cy="12" r="2.2"></circle>
      </svg>
    ),
  },
];

export default function RMBottomNavbar({ activeRoute, onNavigate }) {
  return (
    <nav className="rm-bottom-nav" aria-label="RM Navigation">
      {RM_NAV_TABS.map((tab) => {
        const isActive = activeRoute === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`rm-nav-item ${isActive ? 'active' : ''}`}
            onClick={() => onNavigate(tab.id)}
            aria-label={tab.label}
          >
            <div className="rm-nav-icon">{tab.icon}</div>
            <span>{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

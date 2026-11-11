import React from 'react';

const DOCK_TABS = [
  {
    id: 'home',
    title: 'Home',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
      </svg>
    ),
  },
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="8" height="8" rx="1.5"></rect>
        <rect x="13" y="3" width="8" height="5" rx="1.5"></rect>
        <rect x="13" y="10" width="8" height="11" rx="1.5"></rect>
        <rect x="3" y="13" width="8" height="8" rx="1.5"></rect>
      </svg>
    ),
  },
  {
    id: 'menu',
    title: 'Menu',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    ),
  },
];

export default function BottomNavbar({ activeTab, onTabSelect }) {
  const handleTabClick = (tabId) => {
    // Agar tab already active hai toh dobara redundant click / re-render trigger nahi hoga
    if (activeTab !== tabId) {
      onTabSelect(tabId);
    }
  };

  return (
    <nav className="bottom-dock-nav gpu-accel" aria-label="Customer Navigation">
      {DOCK_TABS.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`dock-tab-btn ${isActive ? 'active' : ''}`}
            onClick={() => handleTabClick(tab.id)}
            aria-label={tab.title}
            style={{ cursor: isActive ? 'default' : 'pointer' }}
          >
            <div className="dock-tab-icon">{tab.icon}</div>
            <span className="dock-tab-title">{tab.title}</span>
          </button>
        );
      })}
    </nav>
  );
}

import React, { useState } from 'react';
import './styles/agent.css';
import AgentHeader from './components/AgentHeader.jsx';
import AgentBottomNavbar from './components/AgentBottomNavbar.jsx';
import AgentDashboardView from './components/AgentDashboardView.jsx';
import AgentPropertiesView from './components/AgentPropertiesView.jsx';
import AgentEnquiriesView from './components/AgentEnquiriesView.jsx';
import AgentCustomersView from './components/AgentCustomersView.jsx';
import AgentMoreView from './components/AgentMoreView.jsx';
import AgentSidebarDrawer from './components/AgentSidebarDrawer.jsx';
import AgentNotificationDrawer from './components/AgentNotificationDrawer.jsx';

export default function AgentApp({ initialRoute = 'dashboard' }) {
  const [activeRoute, setActiveRoute] = useState(initialRoute);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const handleNavigate = (route) => {
    setActiveRoute(route);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleNotificationClick = () => {
    setIsNotificationOpen(true);
  };

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleProfileClick = () => {
    handleNavigate('more');
  };

  return (
    <div className="agent-portal-root">
      {/* 1. Header (Hamburger, Brand Logo, Notification Bell, Profile, Role Pill) */}
      <AgentHeader
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Slide-in Sidebar Drawer */}
      <AgentSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeRoute={activeRoute}
        onNavigate={(route) => {
          handleNavigate(route);
          setIsSidebarOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <AgentNotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 2. Dynamic Route View */}
      <main style={{ flex: 1 }}>
        {activeRoute === 'dashboard' && (
          <AgentDashboardView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'properties' && (
          <AgentPropertiesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'enquiries' && (
          <AgentEnquiriesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'customers' && (
          <AgentCustomersView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'more' && (
          <AgentMoreView onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Bottom 5-Tab Navigation Bar */}
      <AgentBottomNavbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

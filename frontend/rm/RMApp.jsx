import React, { useState } from 'react';
import './styles/rm.css';
import RMHeader from './components/RMHeader.jsx';
import RMBottomNavbar from './components/RMBottomNavbar.jsx';
import RMDashboardView from './components/RMDashboardView.jsx';
import RMEnquiriesView from './components/RMEnquiriesView.jsx';
import RMCustomersView from './components/RMCustomersView.jsx';
import RMVisitsView from './components/RMVisitsView.jsx';
import RMMoreView from './components/RMMoreView.jsx';
import RMSidebarDrawer from './components/RMSidebarDrawer.jsx';
import RMNotificationDrawer from './components/RMNotificationDrawer.jsx';

export default function RMApp({ initialRoute = 'dashboard' }) {
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
    <div className="rm-portal-root">
      {/* 1. Header (Hamburger, Logo, Notification Bell '2', Profile, RM Pill) */}
      <RMHeader
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Slide-in Sidebar Drawer */}
      <RMSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeRoute={activeRoute}
        onNavigate={(route) => {
          handleNavigate(route);
          setIsSidebarOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <RMNotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 2. Active Route View */}
      <main style={{ flex: 1 }}>
        {activeRoute === 'dashboard' && (
          <RMDashboardView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'enquiries' && (
          <RMEnquiriesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'customers' && (
          <RMCustomersView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'visits' && (
          <RMVisitsView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'more' && (
          <RMMoreView onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Bottom 5-Tab Navigation Bar */}
      <RMBottomNavbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

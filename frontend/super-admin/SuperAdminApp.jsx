import React, { useState } from 'react';
import './styles/super-admin.css';
import SuperAdminHeader from './components/SuperAdminHeader.jsx';
import SuperAdminBottomNavbar from './components/SuperAdminBottomNavbar.jsx';
import SuperAdminDashboardView from './components/SuperAdminDashboardView.jsx';
import SuperAdminPropertiesView from './components/SuperAdminPropertiesView.jsx';
import SuperAdminUsersView from './components/SuperAdminUsersView.jsx';
import SuperAdminActivityView from './components/SuperAdminActivityView.jsx';
import SuperAdminMoreView from './components/SuperAdminMoreView.jsx';
import SuperAdminSidebarDrawer from './components/SuperAdminSidebarDrawer.jsx';
import SuperAdminNotificationDrawer from './components/SuperAdminNotificationDrawer.jsx';

export default function SuperAdminApp({ initialRoute = 'dashboard' }) {
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
    <div className="super-admin-portal-root">
      {/* 1. Header (Hamburger, Logo, Notification Bell '12', Profile, Super Admin Pill) */}
      <SuperAdminHeader
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Slide-in Sidebar Drawer */}
      <SuperAdminSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeRoute={activeRoute}
        onNavigate={(route) => {
          handleNavigate(route);
          setIsSidebarOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <SuperAdminNotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 2. Active Route View */}
      <main style={{ flex: 1 }}>
        {activeRoute === 'dashboard' && (
          <SuperAdminDashboardView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'properties' && (
          <SuperAdminPropertiesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'users' && (
          <SuperAdminUsersView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'activity' && (
          <SuperAdminActivityView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'more' && (
          <SuperAdminMoreView onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Bottom Navigation Bar */}
      <SuperAdminBottomNavbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

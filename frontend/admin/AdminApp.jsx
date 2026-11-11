import React, { useState } from 'react';
import './styles/admin.css';
import AdminHeader from './components/AdminHeader.jsx';
import AdminBottomNavbar from './components/AdminBottomNavbar.jsx';
import AdminDashboardView from './components/AdminDashboardView.jsx';
import AdminPropertiesView from './components/AdminPropertiesView.jsx';
import AdminEnquiriesView from './components/AdminEnquiriesView.jsx';
import AdminTeamView from './components/AdminTeamView.jsx';
import AdminMoreView from './components/AdminMoreView.jsx';
import AdminSidebarDrawer from './components/AdminSidebarDrawer.jsx';
import AdminNotificationDrawer from './components/AdminNotificationDrawer.jsx';

export default function AdminApp({ initialRoute = 'dashboard' }) {
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
    <div className="admin-portal-root">
      {/* 1. Header (Hamburger, Logo, Notification Bell '6', Profile, Admin Pill) */}
      <AdminHeader
        onMenuClick={handleMenuClick}
        onNotificationClick={handleNotificationClick}
        onProfileClick={handleProfileClick}
      />

      {/* Slide-in Sidebar Drawer */}
      <AdminSidebarDrawer
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        activeRoute={activeRoute}
        onNavigate={(route) => {
          handleNavigate(route);
          setIsSidebarOpen(false);
        }}
      />

      {/* Notifications Drawer */}
      <AdminNotificationDrawer
        isOpen={isNotificationOpen}
        onClose={() => setIsNotificationOpen(false)}
      />

      {/* 2. Active Route View */}
      <main style={{ flex: 1 }}>
        {activeRoute === 'dashboard' && (
          <AdminDashboardView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'properties' && (
          <AdminPropertiesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'enquiries' && (
          <AdminEnquiriesView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'team' && (
          <AdminTeamView onNavigate={handleNavigate} />
        )}

        {activeRoute === 'more' && (
          <AdminMoreView onNavigate={handleNavigate} />
        )}
      </main>

      {/* 3. Bottom 5-Tab Navigation Bar */}
      <AdminBottomNavbar
        activeRoute={activeRoute}
        onNavigate={handleNavigate}
      />
    </div>
  );
}

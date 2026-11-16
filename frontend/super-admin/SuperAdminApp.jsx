import React, { useState, useEffect } from 'react';
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
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
    let user = null;
    try {
      user = JSON.parse(localStorage.getItem('user_info') || '{}');
    } catch (e) {
      user = null;
    }

    if (!user || user.role !== 'super_admin') {
      window.location.href = '/login';
      return;
    }

    if (!token) {
      const selfToken = 'sa_session_' + btoa(JSON.stringify({ role: 'super_admin', email: user.email || 'superadmin@shubharambhrealty.com', ts: Date.now() }));
      localStorage.setItem('auth_token', selfToken);
    }

    setIsAuthorized(true);
  }, []);

  if (!isAuthorized) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#F8FAFC', color: '#64748B', fontSize: '13px', fontWeight: '600' }}>
        Verifying Super Admin Authorization...
      </div>
    );
  }

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

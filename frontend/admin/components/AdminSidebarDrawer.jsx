import React from 'react';
import logoImg from '../../customer/assets/logo.png';

const ADMIN_DRAWER_NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊' },
  { id: 'properties', label: 'Properties (86)', icon: '🏢' },
  { id: 'enquiries', label: 'Enquiries (210)', icon: '💬' },
  { id: 'team', label: 'RM Team (12)', icon: '👥' },
  { id: 'more', label: 'Settings & Profile', icon: '⚙️' },
];

const PORTAL_LINKS = [
  { path: '/', label: 'Customer Portal', role: 'Customer' },
  { path: '/agent', label: 'Agent Portal', role: 'Agent' },
  { path: '/rm', label: 'RM Dashboard', role: 'RM' },
  { path: '/admin', label: 'Admin Console', role: 'Admin (Active)' },
  { path: '/super-admin', label: 'Super Admin', role: 'Super Admin' },
];

export default function AdminSidebarDrawer({ isOpen, onClose, activeRoute, onNavigate }) {
  if (!isOpen) return null;

  const handlePortalSwitch = (path) => {
    window.location.pathname = path;
  };

  return (
    <>
      <div className="admin-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="admin-sidebar-drawer" role="dialog" aria-modal="true" aria-label="Admin Navigation Menu">
        <div className="admin-drawer-header">
          <div className="admin-drawer-brand">
            <img
              src={logoImg}
              alt="Shubharambh Realty"
              className="admin-drawer-logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
            />
            <span className="admin-drawer-badge">Admin Panel</span>
          </div>
          <button
            type="button"
            className="admin-drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="admin-drawer-nav">
          <div className="admin-drawer-section-title">Navigation</div>
          {ADMIN_DRAWER_NAV.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="admin-drawer-divider" />
          <div className="admin-drawer-section-title">Switch Portal</div>
          {PORTAL_LINKS.map((link) => (
            <button
              key={link.path}
              type="button"
              className="admin-drawer-portal-link"
              onClick={() => handlePortalSwitch(link.path)}
              style={{
                background: link.path === '/admin' ? '#FEF3C7' : 'transparent',
                fontWeight: link.path === '/admin' ? '700' : '500',
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>{link.role}</span>
            </button>
          ))}
        </nav>

        <div className="admin-drawer-footer">
          <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>
            Shubharambh Realty
          </div>
          <div>Powered by eformx</div>
          <div style={{ marginTop: '4px' }}>📞 +91 7275004901</div>
          <div>✉️ support@eformx.com</div>
        </div>
      </aside>
    </>
  );
}

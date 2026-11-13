import React from 'react';
import logoImg from '../../customer/assets/logo.png';

const RM_DRAWER_NAV = [
  { id: 'dashboard', label: 'RM Dashboard', icon: '📊' },
  { id: 'enquiries', label: 'Client Enquiries (18)', icon: '💬' },
  { id: 'customers', label: 'Customer Portfolio (12)', icon: '👥' },
  { id: 'visits', label: 'Site Visits (6)', icon: '📍' },
  { id: 'more', label: 'Settings & Profile', icon: '⚙️' },
];

const PORTAL_LINKS = [
  { path: '/', label: 'Customer Portal', role: 'Customer' },
  { path: '/agent', label: 'Agent Portal', role: 'Agent' },
  { path: '/rm', label: 'RM Dashboard', role: 'RM (Active)' },
  { path: '/admin', label: 'Admin Console', role: 'Admin' },
  { path: '/super-admin', label: 'Super Admin', role: 'Super Admin' },
];

export default function RMSidebarDrawer({ isOpen, onClose, activeRoute, onNavigate }) {
  if (!isOpen) return null;

  const handlePortalSwitch = (path) => {
    window.location.pathname = path;
  };

  return (
    <>
      <div className="rm-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="rm-sidebar-drawer" role="dialog" aria-modal="true" aria-label="RM Navigation Menu">
        <div className="rm-drawer-header">
          <div className="rm-drawer-brand">
            <img
              src={logoImg}
              alt="Shubharambh Realty"
              className="rm-drawer-logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
            />
            <span className="rm-drawer-badge">RM Desk</span>
          </div>
          <button
            type="button"
            className="rm-drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="rm-drawer-nav">
          <div className="rm-drawer-section-title">Navigation</div>
          {RM_DRAWER_NAV.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`rm-drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="rm-drawer-divider" />
          <div className="rm-drawer-section-title">Switch Portal</div>
          {PORTAL_LINKS.map((link) => (
            <button
              key={link.path}
              type="button"
              className="rm-drawer-portal-link"
              onClick={() => handlePortalSwitch(link.path)}
              style={{
                background: link.path === '/rm' ? '#FEF3C7' : 'transparent',
                fontWeight: link.path === '/rm' ? '700' : '500',
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>{link.role}</span>
            </button>
          ))}
        </nav>

        <div className="rm-drawer-footer">
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

import React from 'react';
import logoImg from '../../customer/assets/logo.png';

const SA_DRAWER_NAV = [
  { id: 'dashboard', label: 'Executive Dashboard', icon: '📊' },
  { id: 'properties', label: 'Platform Lands & Sites', icon: '🏢' },
  { id: 'users', label: 'Platform Users', icon: '👥' },
  { id: 'activity', label: 'Platform Audit Logs', icon: '📜' },
  { id: 'more', label: 'Governance & Settings', icon: '⚙️' },
];

const PORTAL_LINKS = [
  { path: '/', label: 'Customer Portal', role: 'Customer' },
  { path: '/agent', label: 'Agent Portal', role: 'Agent' },
  { path: '/rm', label: 'RM Dashboard', role: 'RM' },
  { path: '/admin', label: 'Admin Console', role: 'Admin' },
  { path: '/super-admin', label: 'Super Admin', role: 'Super Admin (Active)' },
];

export default function SuperAdminSidebarDrawer({ isOpen, onClose, activeRoute, onNavigate }) {
  if (!isOpen) return null;

  const handlePortalSwitch = (path) => {
    window.location.pathname = path;
  };

  return (
    <>
      <div className="sa-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="sa-sidebar-drawer" role="dialog" aria-modal="true" aria-label="Super Admin Menu">
        <div className="sa-drawer-header">
          <div className="sa-drawer-brand">
            <img
              src={logoImg}
              alt="Shubharambh Realty"
              className="sa-drawer-logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
            />
            <span className="sa-drawer-badge">Super Admin</span>
          </div>
          <button
            type="button"
            className="sa-drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="sa-drawer-nav">
          <div className="sa-drawer-section-title">Executive Navigation</div>
          {SA_DRAWER_NAV.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`sa-drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="sa-drawer-divider" />
          <div className="sa-drawer-section-title">Switch Portal</div>
          {PORTAL_LINKS.map((link) => (
            <button
              key={link.path}
              type="button"
              className="sa-drawer-portal-link"
              onClick={() => handlePortalSwitch(link.path)}
              style={{
                background: link.path === '/super-admin' ? '#FEF3C7' : 'transparent',
                fontWeight: link.path === '/super-admin' ? '700' : '500',
              }}
            >
              <span>{link.label}</span>
              <span style={{ fontSize: '11px', color: '#64748B' }}>{link.role}</span>
            </button>
          ))}
        </nav>

        <div className="sa-drawer-footer">
          <div style={{ fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>
            Shubharambh Realty
          </div>
          <div>Authorized Platform Control • Powered by eformx</div>
          <div style={{ marginTop: '4px' }}>📞 +91 7275004901</div>
          <div>✉️ support@eformx.com</div>
        </div>
      </aside>
    </>
  );
}

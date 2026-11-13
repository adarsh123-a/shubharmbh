import React from 'react';
import logoImg from '../../customer/assets/logo.png';

const AGENT_DRAWER_NAV = [
  { id: 'dashboard', label: 'Agent Dashboard', icon: '📊' },
  { id: 'properties', label: 'Properties Portfolio', icon: '🏡' },
  { id: 'enquiries', label: 'Client Enquiries', icon: '💬' },
  { id: 'customers', label: 'Customer Contacts', icon: '👥' },
  { id: 'more', label: 'Agent Profile & Settings', icon: '⚙️' },
];

export default function AgentSidebarDrawer({ isOpen, onClose, activeRoute, onNavigate }) {
  if (!isOpen) return null;

  const handlePortalSwitch = (path) => {
    window.location.pathname = path;
  };

  return (
    <>
      <div className="agent-drawer-backdrop" onClick={onClose} aria-hidden="true" />
      <aside className="agent-sidebar-drawer" role="dialog" aria-modal="true" aria-label="Agent Navigation Menu">
        <div className="agent-drawer-header">
          <div className="agent-drawer-brand">
            <img
              src={logoImg}
              alt="Shubharambh Realty"
              className="agent-drawer-logo"
              onError={(e) => {
                e.currentTarget.onerror = null;
              }}
            />
            <span className="agent-drawer-badge">Agent Desk</span>
          </div>
          <button
            type="button"
            className="agent-drawer-close-btn"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav className="agent-drawer-nav">
          <div className="agent-drawer-section-title">Navigation</div>
          {AGENT_DRAWER_NAV.map((item) => {
            const isActive = activeRoute === item.id;
            return (
              <button
                key={item.id}
                type="button"
                className={`agent-drawer-item ${isActive ? 'active' : ''}`}
                onClick={() => onNavigate(item.id)}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          })}


        </nav>

        <div className="agent-drawer-footer">
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

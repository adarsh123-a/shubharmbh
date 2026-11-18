import React, { useState, useEffect } from 'react';
import { adminService } from '../services/adminService.js';

export default function AdminActivityView() {
  const [activities, setActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchActivities = (role = 'all') => {
    setIsLoading(true);
    adminService.getActivities(role).then((data) => {
      setActivities(Array.isArray(data) ? data : []);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    fetchActivities(selectedRole);
  }, [selectedRole]);

  const getActionBadge = (action = '') => {
    const act = action.toUpperCase();
    if (act.includes('LEAD') || act.includes('CUSTOMER')) {
      return { bg: '#DCFCE7', color: '#16A34A', label: 'Customer Lead' };
    }
    if (act.includes('VISIT')) {
      return { bg: '#FEF3C7', color: '#D97706', label: 'Site Visit' };
    }
    if (act.includes('BOOKING')) {
      return { bg: '#F3E8FF', color: '#9333EA', label: 'Plot Booking' };
    }
    if (act.includes('AGENT')) {
      return { bg: '#EFF6FF', color: '#2563EB', label: 'Agent Onboarded' };
    }
    if (act.includes('LOGIN')) {
      return { bg: '#F1F5F9', color: '#475569', label: 'Sign In' };
    }
    return { bg: '#E0F2FE', color: '#0284C7', label: 'Activity' };
  };

  const filtered = activities.filter((item) => {
    const term = searchTerm.toLowerCase();
    const actorName = (item.actorName || '').toLowerCase();
    const details = (item.details || '').toLowerCase();
    const role = (item.actorRole || '').toLowerCase();
    return actorName.includes(term) || details.includes(term) || role.includes(term);
  });

  return (
    <div className="admin-main-content admin-activity-view">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            RM & Agent Activity Tracker
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            Live tracking of actions taken by Relationship Managers and Agents
          </span>
        </div>
        <button
          type="button"
          onClick={() => fetchActivities(selectedRole)}
          style={{
            backgroundColor: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '8px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '700',
            color: '#334155',
            cursor: 'pointer',
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Role Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        {[
          { id: 'all', label: 'All Activities' },
          { id: 'rm', label: '👔 RM Activity' },
          { id: 'agent', label: '👤 Agent Activity' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setSelectedRole(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '9999px',
              border: selectedRole === tab.id ? '1px solid #D97706' : '1px solid #CBD5E1',
              backgroundColor: selectedRole === tab.id ? '#D97706' : '#FFFFFF',
              color: selectedRole === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, action or details..."
          style={{
            width: '100%',
            boxSizing: 'border-box',
            backgroundColor: '#FFFFFF',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '9px 12px 9px 34px',
            fontSize: '12px',
            color: '#0F172A',
            outline: 'none',
          }}
        />
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#94A3B8"
          strokeWidth="2.2"
          style={{ position: 'absolute', left: '11px', top: '10px' }}
        >
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {/* Activity List */}
      {isLoading ? (
        <div style={{ padding: '36px', textAlign: 'center', color: '#64748B', fontSize: '12px' }}>
          Loading activities...
        </div>
      ) : filtered.length === 0 ? (
        <div
          style={{
            padding: '36px 16px',
            textAlign: 'center',
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            color: '#64748B',
          }}
        >
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>📋</div>
          <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', margin: '0 0 4px' }}>
            No Activities Found
          </h4>
          <p style={{ fontSize: '12px', margin: 0 }}>
            {selectedRole === 'all'
              ? 'RM and Agent actions will appear here in real time.'
              : `No activity recorded for role: ${selectedRole.toUpperCase()}`}
          </p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtered.map((item) => {
            const badge = getActionBadge(item.action);
            const isAgent = (item.actorRole || '').toLowerCase() === 'agent';
            const roleBadgeStyle = isAgent
              ? { bg: '#FEF3C7', color: '#B45309', label: 'AGENT' }
              : { bg: '#DBEAFE', color: '#1D4ED8', label: 'RM' };
            const timeStr = item.createdAt
              ? new Date(item.createdAt).toLocaleString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Just now';

            return (
              <div
                key={item._id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '12px 14px',
                  border: '1px solid #E2E8F0',
                  boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '12px',
                }}
              >
                <div
                  style={{
                    backgroundColor: badge.bg,
                    color: badge.color,
                    padding: '4px 8px',
                    borderRadius: '8px',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    flexShrink: 0,
                    marginTop: '2px',
                  }}
                >
                  {badge.label}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>
                        {item.actorName || 'Team Member'}
                      </span>
                      <span
                        style={{
                          backgroundColor: roleBadgeStyle.bg,
                          color: roleBadgeStyle.color,
                          fontSize: '9.5px',
                          fontWeight: '800',
                          padding: '1px 6px',
                          borderRadius: '6px',
                        }}
                      >
                        {roleBadgeStyle.label}
                      </span>
                    </div>
                    <span style={{ fontSize: '10px', color: '#94A3B8', whiteSpace: 'nowrap' }}>
                      {timeStr}
                    </span>
                  </div>
                  <p style={{ margin: '4px 0 0', fontSize: '11.5px', color: '#475569', lineHeight: 1.4 }}>
                    {item.details}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

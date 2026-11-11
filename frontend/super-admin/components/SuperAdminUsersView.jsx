import React, { useState } from 'react';
import SuperAdminAddUserModal from './SuperAdminAddUserModal.jsx';

const USER_ROLES_DATA = [
  {
    id: 'u-1',
    name: 'Vikramaditya Rao',
    role: 'Admin',
    department: 'Lucknow Central Branch Operations',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    email: 'admin.lko@eformx.com',
  },
  {
    id: 'u-2',
    name: 'Ayush Srivastava',
    role: 'Relationship Manager',
    department: 'Gomti Nagar Region',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    email: 'ayush.rm@eformx.com',
  },
  {
    id: 'u-3',
    name: 'Rishabh Tripathi',
    role: 'Agent',
    department: 'Independent Residential Specialist',
    status: 'Verified',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    email: 'rishabh.agent@eformx.com',
  },
  {
    id: 'u-4',
    name: 'Pooja Verma',
    role: 'Relationship Manager',
    department: 'Key Accounts & Luxury Villas',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    email: 'pooja.rm@eformx.com',
  },
  {
    id: 'u-5',
    name: 'Suresh Chandra',
    role: 'Customer',
    department: 'Commercial Buyer Account',
    status: 'Active',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    email: 'suresh.client@eformx.com',
  },
];

export default function SuperAdminUsersView() {
  const [usersList, setUsersList] = useState(USER_ROLES_DATA);
  const [roleFilter, setRoleFilter] = useState('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [notice, setNotice] = useState('');

  const adminCount = usersList.filter((u) => u.role === 'Admin').length + 23;
  const rmCount = usersList.filter((u) => u.role === 'RM').length + 17;
  const agentCount = usersList.filter((u) => u.role === 'Agent').length + 319;
  const custCount = usersList.filter((u) => u.role === 'Customer').length + 95;

  const filtered = usersList.filter((u) => {
    if (roleFilter === 'all') return true;
    return u.role.toLowerCase() === roleFilter.toLowerCase();
  });

  const handleAddUser = (newUser) => {
    setUsersList((prev) => [newUser, ...prev]);
    setNotice(`Account for ${newUser.name} (${newUser.role}) provisioned successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleToggleStatus = (userId) => {
    setUsersList((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
          setNotice(`User ${u.name} status updated to: ${newStatus}`);
          setTimeout(() => setNotice(''), 4000);
          return {
            ...u,
            status: newStatus,
            statusBg: newStatus === 'Active' ? '#DCFCE7' : '#F1F5F9',
            statusColor: newStatus === 'Active' ? '#16A34A' : '#64748B',
          };
        }
        return u;
      })
    );
  };

  return (
    <div className="super-admin-main-content super-admin-users-view">
      {notice && (
        <div
          style={{
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            padding: '8px 14px',
            borderRadius: '12px',
            fontSize: '11.5px',
            fontWeight: '700',
            marginBottom: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span>✅ {notice}</span>
          <button
            type="button"
            onClick={() => setNotice('')}
            style={{ background: 'none', border: 'none', color: '#15803D', cursor: 'pointer', fontWeight: '800' }}
          >
            ✕
          </button>
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            User Hierarchies
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {usersList.length + 454} Total Enterprise Accounts
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAddOpen(true)}
          style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 12px',
            fontSize: '11px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          + Add User
        </button>
      </div>

      {/* Role Summary Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '14px' }}>
        {[
          { label: 'Admins', count: adminCount, bg: '#F3E8FF', color: '#9333EA' },
          { label: 'RMs', count: rmCount, bg: '#E0F2FE', color: '#0284C7' },
          { label: 'Agents', count: agentCount, bg: '#FFE4E6', color: '#E11D48' },
          { label: 'Customers', count: custCount, bg: '#FFEDD5', color: '#EA580C' },
        ].map((item) => (
          <div key={item.label} style={{ background: item.bg, borderRadius: '12px', padding: '8px 6px', textAlign: 'center' }}>
            <div style={{ fontSize: '15px', fontWeight: '800', color: item.color }}>{item.count}</div>
            <div style={{ fontSize: '9.5px', color: '#475569', fontWeight: '700', marginTop: '1px' }}>{item.label}</div>
          </div>
        ))}
      </div>

      {/* Role Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'All (458)' },
          { id: 'admin', label: 'Admins (24)' },
          { id: 'relationship manager', label: 'RMs (18)' },
          { id: 'agent', label: 'Agents (320)' },
          { id: 'customer', label: 'Customers (96)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setRoleFilter(tab.id)}
            style={{
              padding: '5px 11px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: roleFilter === tab.id ? '#D97706' : '#FFFFFF',
              color: roleFilter === tab.id ? '#FFFFFF' : '#64748B',
              fontSize: '10.5px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* User Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {user.name}
                </h4>
                <span
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    fontSize: '9.5px',
                    fontWeight: '700',
                    padding: '1px 6px',
                    borderRadius: '4px',
                  }}
                >
                  {user.role}
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                {user.department}
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '2px' }}>
                ✉️ {user.email}
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleToggleStatus(user.id)}
              style={{
                backgroundColor: user.status === 'Active' ? '#EFF6FF' : '#FEF2F2',
                border: 'none',
                color: user.status === 'Active' ? '#2563EB' : '#DC2626',
                fontSize: '11px',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              title="Click to toggle Active/Suspended status"
            >
              {user.status === 'Active' ? 'Active • Manage' : 'Suspended'}
            </button>
          </div>
        ))}
      </div>

      <SuperAdminAddUserModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddUser={handleAddUser}
      />
    </div>
  );
}

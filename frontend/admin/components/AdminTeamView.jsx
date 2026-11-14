import React, { useState, useEffect } from 'react';
import AdminAddRMModal from './AdminAddRMModal.jsx';
import { adminService } from '../services/adminService.js';

const RM_TEAM = [
  {
    id: 'rm-1',
    name: 'Ayush Srivastava',
    role: 'Senior RM (Gomti Nagar & Indira Nagar)',
    assignedLeads: 28,
    siteVisits: 14,
    status: 'Active',
    phone: '+917275004901',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rm-2',
    name: 'Rishabh Tiwari',
    role: 'Field RM (Faizabad Road & Sultanpur Rd)',
    assignedLeads: 22,
    siteVisits: 11,
    status: 'Active',
    phone: '+917275004901',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rm-3',
    name: 'Pooja Verma',
    role: 'Key Accounts RM (Golf City & Luxury Villas)',
    assignedLeads: 25,
    siteVisits: 16,
    status: 'Active',
    phone: '+917275004901',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    id: 'rm-4',
    name: 'Amitabh Verma',
    role: 'Commercial RM (Hazratganj & Alambagh)',
    assignedLeads: 19,
    siteVisits: 9,
    status: 'On Site',
    phone: '+917275004901',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&q=80',
  },
];

export default function AdminTeamView() {
  const [rmList, setRmList] = useState(RM_TEAM);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [selectedRMReport, setSelectedRMReport] = useState(null);
  const [notice, setNotice] = useState('');

  // Fetch live RMs and assigned agents from backend
  useEffect(() => {
    let isMounted = true;
    adminService.getTeam().then((data) => {
      if (isMounted && data && Array.isArray(data.rms) && data.rms.length > 0) {
        const formatted = data.rms.map((rm) => ({
          id: rm._id,
          name: rm.name,
          role: `Relationship Manager (${rm.agentsCount || 0} Agents Assigned)`,
          assignedLeads: rm.agentsCount ? rm.agentsCount * 12 : 15,
          siteVisits: rm.agentsCount ? rm.agentsCount * 4 : 6,
          status: rm.isActive ? 'Active' : 'Suspended',
          phone: rm.phone ? `+91 ${rm.phone}` : '+91 7275004901',
          email: rm.email,
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        }));
        setRmList(formatted);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddRM = (newRM) => {
    setRmList((prev) => [newRM, ...prev]);
    setNotice(`Relationship Manager ${newRM.name} registered successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="admin-main-content admin-team-view">
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
            RM Team Supervision
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {rmList.length + 8} Relationship Managers Registered
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
          + Add RM
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {rmList.map((rm) => (
          <div
            key={rm.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
              <img
                src={rm.avatar}
                alt={rm.name}
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '1.5px solid #E2E8F0',
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <h4 style={{ fontSize: '13.5px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {rm.name}
                  </h4>
                  <span
                    style={{
                      backgroundColor: rm.status === 'Active' ? '#DCFCE7' : '#FEF3C7',
                      color: rm.status === 'Active' ? '#16A34A' : '#D97706',
                      fontSize: '10px',
                      fontWeight: '800',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                    }}
                  >
                    {rm.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {rm.role || rm.territory}
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <div style={{ background: '#F8FAFC', padding: '6px 10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Assigned Leads</span>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>{rm.assignedLeads ?? rm.activeLeads ?? 0}</div>
              </div>
              <div style={{ background: '#F8FAFC', padding: '6px 10px', borderRadius: '8px' }}>
                <span style={{ fontSize: '10px', color: '#64748B' }}>Site Visits Done</span>
                <div style={{ fontSize: '14px', fontWeight: '800', color: '#16A34A' }}>{rm.siteVisits ?? rm.visitsCount ?? 0}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
              <a
                href={`tel:${rm.phone}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '5px 0',
                  borderRadius: '6px',
                  textDecoration: 'none',
                }}
              >
                📞 Contact RM
              </a>
              <button
                type="button"
                onClick={() => setSelectedRMReport(rm)}
                style={{
                  flex: 1,
                  backgroundColor: '#F1F5F9',
                  color: '#0F172A',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '5px 0',
                  borderRadius: '6px',
                  cursor: 'pointer',
                }}
              >
                View Report
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* RM Performance Report Modal */}
      {selectedRMReport && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedRMReport(null)}>
          <div className="admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>RM Performance Report</h3>
                <p>{selectedRMReport.name} • {selectedRMReport.status}</p>
              </div>
              <button
                type="button"
                className="admin-drawer-close-btn"
                onClick={() => setSelectedRMReport(null)}
              >
                ✕
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{selectedRMReport.assignedLeads ?? 12}</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>Active Leads</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#16A34A' }}>{selectedRMReport.siteVisits ?? 8}</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>Visits Done</div>
                </div>
                <div style={{ background: '#F8FAFC', padding: '10px', borderRadius: '10px', textAlign: 'center' }}>
                  <div style={{ fontSize: '16px', fontWeight: '800', color: '#D97706' }}>94%</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>SLA Score</div>
                </div>
              </div>
              <div style={{ fontSize: '12px', color: '#475569', lineHeight: 1.5, background: '#F1F5F9', padding: '12px', borderRadius: '10px' }}>
                <div><strong>Contact:</strong> {selectedRMReport.phone}</div>
                <div><strong>Email:</strong> {selectedRMReport.email || `${selectedRMReport.name.toLowerCase().replace(' ', '.')}@eformx.com`}</div>
                <div><strong>Cluster:</strong> {selectedRMReport.territory || 'Gomti Nagar Corridor'}</div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button
                type="button"
                className="admin-btn-primary"
                onClick={() => setSelectedRMReport(null)}
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}

      <AdminAddRMModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddRM={handleAddRM}
      />
    </div>
  );
}

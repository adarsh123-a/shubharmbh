import React, { useState } from 'react';

const ADMIN_LEADS_LIST = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#0D9488',
    name: 'Rahul Sharma',
    detail: '3 BHK in Gomti Nagar',
    assignedRM: 'Ayush Srivastava (RM-01)',
    badgeText: 'New',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '10 mins ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    
    id: 'enq-2',
    initials: 'PK',
    avatarBg: '#3B82F6',
    name: 'Preeti Kumar',
    detail: 'Plot in Faizabad Road',
    assignedRM: 'Pooja Verma (RM-03)',
    badgeText: 'Interested',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '25 mins ago',
    phone: '+917275004901',
    category: 'interested',
  },
  {
    id: 'enq-3',
    initials: 'AM',
    avatarBg: '#64748B',
    name: 'Amit Mishra',
    detail: 'Independent House',
    assignedRM: 'Rishabh Tiwari (RM-02)',
    badgeText: 'Site Visit',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    time: '1 hour ago',
    phone: '+917275004901',
    category: 'site_visit',
  },
  {
    id: 'enq-4',
    initials: 'SG',
    avatarBg: '#94A3B8',
    name: 'Sneha Gupta',
    detail: '2 BHK Apartment',
    assignedRM: 'Ayush Srivastava (RM-01)',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '2 hours ago',
    phone: '+917275004901',
    category: 'follow_up',
  },
];

export default function AdminEnquiriesView() {
  const [leadsList, setLeadsList] = useState(ADMIN_LEADS_LIST);
  const [activeTab, setActiveTab] = useState('all');
  const [reassignEnq, setReassignEnq] = useState(null);
  const [targetRM, setTargetRM] = useState('Priya Singh (RM)');
  const [notice, setNotice] = useState('');

  const filtered = leadsList.filter((item) => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const handleConfirmReassign = (e) => {
    e.preventDefault();
    if (!reassignEnq) return;

    setLeadsList((prev) =>
      prev.map((lead) => {
        if (lead.id === reassignEnq.id) {
          return {
            ...lead,
            assignedRM: targetRM,
          };
        }
        return lead;
      })
    );

    setNotice(`Lead ${reassignEnq.name} reassigned to ${targetRM}!`);
    setReassignEnq(null);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="admin-main-content admin-enquiries-view">
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

      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Central Enquiry Stream
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          210 Total Customer Leads Received
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: 'All (210)' },
          { id: 'new', label: 'New (45)' },
          { id: 'interested', label: 'Interested (68)' },
          { id: 'site_visit', label: 'Site Visits (52)' },
          { id: 'follow_up', label: 'Follow Up (45)' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '5px 11px',
              borderRadius: '9999px',
              border: 'none',
              backgroundColor: activeTab === tab.id ? '#D97706' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : '#64748B',
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

      {/* Leads List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((enq) => (
          <div
            key={enq.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: enq.avatarBg,
                    color: '#FFFFFF',
                    fontSize: '12px',
                    fontWeight: '800',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  {enq.initials}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {enq.name}
                  </div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {enq.detail}
                  </div>
                </div>
              </div>

              <span
                style={{
                  backgroundColor: enq.badgeBg,
                  color: enq.badgeColor,
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                  flexShrink: 0,
                }}
              >
                {enq.badgeText}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <span style={{ fontSize: '10px', color: '#64748B' }}>
                👤 Assigned: <strong>{enq.assignedRM}</strong>
              </span>

              <div style={{ display: 'flex', gap: '6px' }}>
                <a
                  href={`tel:${enq.phone}`}
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                  }}
                >
                  📞 Call
                </a>
                <button
                  type="button"
                  onClick={() => setReassignEnq(enq)}
                  style={{
                    backgroundColor: '#F1F5F9',
                    color: '#0F172A',
                    border: 'none',
                    fontSize: '10.5px',
                    fontWeight: '700',
                    padding: '3px 9px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  Reassign
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reassign Lead Modal */}
      {reassignEnq && (
        <div className="admin-modal-backdrop" onClick={() => setReassignEnq(null)}>
          <div className="admin-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <div>
                <h3>Reassign Lead</h3>
                <p>{reassignEnq.name} • {reassignEnq.detail}</p>
              </div>
              <button
                type="button"
                className="admin-drawer-close-btn"
                onClick={() => setReassignEnq(null)}
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleConfirmReassign}>
              <div className="admin-modal-body">
                <div className="admin-form-group">
                  <label className="admin-form-label">Client Name</label>
                  <input
                    type="text"
                    className="admin-form-input"
                    value={reassignEnq.name}
                    disabled
                    style={{ opacity: 0.8 }}
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-form-label">Select Target Relationship Manager</label>
                  <select
                    className="admin-form-select"
                    value={targetRM}
                    onChange={(e) => setTargetRM(e.target.value)}
                  >
                    <option value="Rohit Sharma (RM)">Rohit Sharma (Gomti Nagar)</option>
                    <option value="Priya Singh (RM)">Priya Singh (Indira Nagar)</option>
                    <option value="Aman Gupta (RM)">Aman Gupta (Shaheed Path)</option>
                    <option value="Sneha Mishra (RM)">Sneha Mishra (Hazratganj)</option>
                  </select>
                </div>
              </div>
              <div className="admin-modal-footer">
                <button
                  type="button"
                  className="admin-btn-secondary"
                  onClick={() => setReassignEnq(null)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="admin-btn-primary"
                >
                  Confirm Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

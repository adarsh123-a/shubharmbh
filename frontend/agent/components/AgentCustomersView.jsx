import React, { useState, useEffect } from 'react';
import AgentAddPropertyModal from './AgentAddPropertyModal.jsx';
import { agentService } from '../services/agentService.js';

const INITIAL_LEADS = [
  {
    id: 'lead-1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '+917275004901',
    status: 'Site Visit Scheduled',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    date: '28 Oct 2026',
  },
  {
    id: 'lead-2',
    name: 'Priyanka Saxena',
    email: 'priyanka@example.com',
    phone: '+917275004901',
    status: 'Call Done / Contacted',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    date: '27 Oct 2026',
  },
  {
    id: 'lead-3',
    name: 'Suresh Chandra',
    email: 'suresh@example.com',
    phone: '+917275004901',
    status: 'Plot Booked',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    date: '26 Oct 2026',
  },
  {
    id: 'lead-4',
    name: 'Neelam Tiwari',
    email: 'neelam@example.com',
    phone: '+917275004901',
    status: 'New Lead',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    date: '25 Oct 2026',
  },
];

export default function AgentCustomersView() {
  const [customers, setCustomers] = useState(INITIAL_LEADS);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isMounted = true;
    agentService.getCustomers().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const statusMap = {
          new: { label: 'New Lead', bg: '#DCFCE7', color: '#16A34A' },
          contacted: { label: 'Call Done', bg: '#DBEAFE', color: '#2563EB' },
          visit_scheduled: { label: 'Site Visit Scheduled', bg: '#FEF3C7', color: '#D97706' },
          booked: { label: 'Plot Booked', bg: '#F3E8FF', color: '#9333EA' },
          lost: { label: 'Lost', bg: '#FEE2E2', color: '#DC2626' },
        };

        const mapped = data.map((item) => {
          const st = statusMap[item.status] || statusMap.new;
          return {
            id: item._id,
            name: item.name,
            email: item.email || 'N/A',
            phone: item.phone,
            status: st.label,
            statusBg: st.bg,
            statusColor: st.color,
            date: new Date(item.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          };
        });
        setCustomers(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleLeadAdded = (newLead) => {
    setCustomers((prev) => [newLead, ...prev]);
    setNotice(`Customer "${newLead.name}" added successfully and forwarded to RM!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const filtered = customers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.phone.includes(searchTerm) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="agent-main-content agent-customers-view">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
            Customer Leads
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {customers.length} Total Registered Client Leads
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          style={{
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '9999px',
            padding: '6px 14px',
            fontSize: '11.5px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          + Add Lead
        </button>
      </div>

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
          }}
        >
          ✅ {notice}
        </div>
      )}

      {/* Search Bar */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by customer name, phone or email..."
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

      {/* Customer List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {filtered.map((cust) => (
          <div
            key={cust.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                {cust.name}
              </h4>
              <span
                style={{
                  backgroundColor: cust.statusBg,
                  color: cust.statusColor,
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {cust.status}
              </span>
            </div>

            <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '2px' }}>
              📞 Phone: <strong>{cust.phone}</strong>
            </div>

            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '4px' }}>
              ✉️ Email: {cust.email}
            </div>

            <div style={{ fontSize: '10.5px', color: '#94A3B8', marginBottom: '10px' }}>
              📅 Registered: {cust.date}
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <a
                href={`tel:${cust.phone}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                📞 Call Customer
              </a>
              <a
                href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cust.name)},%20I%20am%20your%20property%20agent%20from%20Shubharambh%20Realty`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '6px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Add Lead Modal (Strictly Name, Email, Phone) */}
      <AgentAddPropertyModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddLead={handleLeadAdded}
      />
    </div>
  );
}

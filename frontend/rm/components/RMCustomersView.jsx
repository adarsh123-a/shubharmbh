import React, { useState, useEffect } from 'react';
import { rmService } from '../services/rmService.js';

const INITIAL_CUSTOMERS = [
  {
    id: 'lead-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+917275004901',
    agentName: 'Vikas Verma (Agent #102)',
    agentPhone: '+919876543210',
    propertyInterest: 'एयरपोर्ट चकेरी साइट (Plot #14)',
    budget: '₹ 15 - 20 Lakh (200 गज)',
    status: 'new',
    notes: 'Agent ne call karke bola ki customer urgent registry chahte hain.',
  },
  {
    id: 'lead-2',
    customerName: 'Preeti Kumar',
    customerPhone: '+917275004901',
    agentName: 'Sunil Kumar (Agent #105)',
    agentPhone: '+919876543211',
    propertyInterest: 'अवध ग्रीन सिटी लैंड प्रोजेक्ट',
    budget: '₹ 12 Lakh (150 गज)',
    status: 'contacted',
    notes: 'Customer se baat hui, Sunday ko site visit dekhne aayenge.',
  },
  {
    id: 'lead-3',
    customerName: 'Amit Mishra',
    customerPhone: '+917275004901',
    agentName: 'Deepak Tiwari (Agent #108)',
    agentPhone: '+919876543212',
    propertyInterest: 'कानपुर रोड कमर्शियल प्लॉट्स',
    budget: '₹ 25 Lakh (300 गज)',
    status: 'visit_scheduled',
    notes: 'Cab pickup arrange karna hai Ramadevi se.',
  },
  {
    id: 'lead-4',
    customerName: 'Sneha Gupta',
    customerPhone: '+917275004901',
    agentName: 'Vikas Verma (Agent #102)',
    agentPhone: '+919876543210',
    propertyInterest: 'गंगा बैराज फार्मलैंड व प्लॉट्स',
    budget: '₹ 18 Lakh (250 गज)',
    status: 'contacted',
    notes: 'Brochure aur layout map WhatsApp par share kar diya hai.',
  },
];

const STATUS_CONFIG = {
  new: { label: 'New Lead', bg: '#DCFCE7', color: '#16A34A' },
  contacted: { label: 'Call Done / Contacted', bg: '#DBEAFE', color: '#2563EB' },
  visit_scheduled: { label: 'Site Visit Scheduled', bg: '#FEF3C7', color: '#D97706' },
  booked: { label: 'Plot Booked', bg: '#F3E8FF', color: '#9333EA' },
  lost: { label: 'Lost / Not Interested', bg: '#FEE2E2', color: '#DC2626' },
};

export default function RMCustomersView() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');
  const [editingNotesId, setEditingNotesId] = useState(null);
  const [noteText, setNoteText] = useState('');
  const [feedback, setFeedback] = useState('');
  const [savingId, setSavingId] = useState(null);

  // Fetch live leads from backend
  useEffect(() => {
    let isMounted = true;
    rmService.getLeads().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item) => ({
          id: item._id,
          customerName: item.name,
          customerPhone: item.phone,
          agentName: item.assignedAgent?.name ? `${item.assignedAgent.name} (Agent)` : 'Assigned Agent',
          agentPhone: item.assignedAgent?.phone || '',
          propertyInterest: item.interestedLand ? `Land Scheme #${item.interestedLand}` : (item.preferredLocation || 'Verified Plots'),
          budget: item.budget ? `Budget: ${item.budget}` : 'Budget Discussion Pending',
          status: item.status || 'new',
          notes: item.notes || '',
        }));
        setCustomers(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const handleStatusChange = async (leadId, newStatus) => {
    setSavingId(leadId);
    try {
      await rmService.updateLead(leadId, { status: newStatus });
      setCustomers((prev) =>
        prev.map((c) => (c.id === leadId ? { ...c, status: newStatus } : c))
      );
      setFeedback('Status updated successfully!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      console.warn('Fallback status update:', err.message);
      setCustomers((prev) =>
        prev.map((c) => (c.id === leadId ? { ...c, status: newStatus } : c))
      );
      setFeedback('Status updated locally.');
      setTimeout(() => setFeedback(''), 3000);
    } finally {
      setSavingId(null);
    }
  };

  const handleSaveNotes = async (leadId) => {
    setSavingId(leadId);
    try {
      await rmService.updateLead(leadId, { notes: noteText });
      setCustomers((prev) =>
        prev.map((c) => (c.id === leadId ? { ...c, notes: noteText } : c))
      );
      setEditingNotesId(null);
      setNoteText('');
      setFeedback('Discussion notes saved successfully!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      console.warn('Fallback notes save:', err.message);
      setCustomers((prev) =>
        prev.map((c) => (c.id === leadId ? { ...c, notes: noteText } : c))
      );
      setEditingNotesId(null);
      setFeedback('Notes saved locally.');
      setTimeout(() => setFeedback(''), 3000);
    } finally {
      setSavingId(null);
    }
  };

  const filtered = customers.filter((c) => {
    const matchesTab = activeTab === 'all' || c.status === activeTab;
    const matchesQuery =
      c.customerName.toLowerCase().includes(query.toLowerCase()) ||
      c.customerPhone.includes(query) ||
      c.propertyInterest.toLowerCase().includes(query.toLowerCase()) ||
      c.agentName.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="rm-main-content rm-customers-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Agent Leads & Customer Contact
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Call customer directly and track status
        </span>
      </div>

      {feedback && (
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
          ✅ {feedback}
        </div>
      )}

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', paddingBottom: '6px', marginBottom: '10px' }}>
        {[
          { id: 'all', label: 'All Leads' },
          { id: 'new', label: 'New' },
          { id: 'contacted', label: 'Contacted' },
          { id: 'visit_scheduled', label: 'Visit Planned' },
          { id: 'booked', label: 'Booked' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 12px',
              borderRadius: '9999px',
              border: activeTab === tab.id ? '1px solid #D97706' : '1px solid #CBD5E1',
              backgroundColor: activeTab === tab.id ? '#D97706' : '#FFFFFF',
              color: activeTab === tab.id ? '#FFFFFF' : '#475569',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by customer, phone, agent or plot..."
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

      {/* Customers List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((cust) => {
          const cfg = STATUS_CONFIG[cust.status] || STATUS_CONFIG.new;

          return (
            <div
              key={cust.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Agent info */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  padding: '6px 10px',
                  marginBottom: '10px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: '600' }}>
                  👤 Added by: <strong style={{ color: '#0F172A' }}>{cust.agentName}</strong>
                </span>
                <span
                  style={{
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {cfg.label}
                </span>
              </div>

              {/* Customer contact info */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {cust.customerName}
                </h4>
                <a
                  href={`tel:${cust.customerPhone}`}
                  style={{ fontSize: '11.5px', color: '#2563EB', fontWeight: '700', textDecoration: 'none' }}
                >
                  📞 {cust.customerPhone}
                </a>
              </div>

              <div style={{ fontSize: '12px', color: '#334155', marginBottom: '4px' }}>
                🏞️ {cust.propertyInterest}
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>
                💰 {cust.budget}
              </div>

              {/* RM Discussion Notes */}
              <div
                style={{
                  backgroundColor: '#FFFBEB',
                  border: '1px dashed #FCD34D',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  marginBottom: '10px',
                  fontSize: '11px',
                  color: '#78350F',
                }}
              >
                {editingNotesId === cust.id ? (
                  <div>
                    <textarea
                      value={noteText}
                      onChange={(e) => setNoteText(e.target.value)}
                      placeholder="Type conversation details (e.g. wants corner plot, visit Sunday)..."
                      rows={2}
                      style={{
                        width: '100%',
                        boxSizing: 'border-box',
                        borderRadius: '6px',
                        border: '1px solid #FCD34D',
                        padding: '6px',
                        fontSize: '11px',
                        fontFamily: 'inherit',
                      }}
                    />
                    <div style={{ display: 'flex', gap: '6px', marginTop: '6px' }}>
                      <button
                        type="button"
                        onClick={() => handleSaveNotes(cust.id)}
                        disabled={savingId === cust.id}
                        style={{
                          backgroundColor: '#D97706',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '4px 10px',
                          fontSize: '10.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        {savingId === cust.id ? 'Saving...' : 'Save Notes'}
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingNotesId(null)}
                        style={{
                          backgroundColor: 'transparent',
                          color: '#78350F',
                          border: 'none',
                          fontSize: '10.5px',
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>
                      📝 <strong>Discussion Notes:</strong> {cust.notes || 'No notes added yet.'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingNotesId(cust.id);
                        setNoteText(cust.notes);
                      }}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#D97706',
                        fontSize: '10.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                      }}
                    >
                      {cust.notes ? 'Edit' : '+ Add Note'}
                    </button>
                  </div>
                )}
              </div>

              {/* Status Selector */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '11px', color: '#475569', fontWeight: '700' }}>Update Status:</span>
                <select
                  value={cust.status}
                  onChange={(e) => handleStatusChange(cust.id, e.target.value)}
                  disabled={savingId === cust.id}
                  style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    color: '#0F172A',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    border: '1px solid #CBD5E1',
                    backgroundColor: '#FFFFFF',
                  }}
                >
                  <option value="new">New Lead</option>
                  <option value="contacted">Call Done / Contacted</option>
                  <option value="visit_scheduled">Site Visit Scheduled</option>
                  <option value="booked">Plot Booked</option>
                  <option value="lost">Lost / Not Interested</option>
                </select>
              </div>

              {/* Action Buttons: Direct Call & WhatsApp */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                <a
                  href={`tel:${cust.customerPhone}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: '#EFF6FF',
                    color: '#2563EB',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    padding: '8px 0',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span>📞 Call Customer</span>
                </a>
                <a
                  href={`https://wa.me/${cust.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(cust.customerName)},%20I%20am%20your%20Relationship%20Manager%20from%20Shubharambh%20Realty%20regarding%20your%20interest%20in%20our%20land%20schemes.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    backgroundColor: '#DCFCE7',
                    color: '#16A34A',
                    fontSize: '11.5px',
                    fontWeight: '700',
                    padding: '8px 0',
                    borderRadius: '8px',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px',
                  }}
                >
                  <span>💬 WhatsApp</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { rmService } from '../services/rmService.js';

const DEFAULT_KPIS = [
  {
    id: 'leads',
    label: 'Agent Leads',
    value: '18',
    trend: 'Live',
    bgTint: '#E0F2FE',
    iconColor: '#0284C7',
    route: 'customers',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
      </svg>
    ),
  },
  {
    id: 'agents',
    label: 'Managed Agents',
    value: '6',
    trend: 'Active',
    bgTint: '#FFEDD5',
    iconColor: '#EA580C',
    route: 'more',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
      </svg>
    ),
  },
  {
    id: 'visits',
    label: 'Site Visits',
    value: '4',
    trend: 'Pending Cab',
    bgTint: '#FEF3C7',
    iconColor: '#D97706',
    route: 'visits',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"></path>
      </svg>
    ),
  },
  {
    id: 'bookings',
    label: 'Plot Bookings',
    value: '3',
    trend: 'Review',
    bgTint: '#F3E8FF',
    iconColor: '#9333EA',
    route: 'more',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"></path>
      </svg>
    ),
  },
];

const FALLBACK_LEADS = [
  {
    id: 'lead-1',
    customerName: 'Rahul Sharma',
    customerPhone: '+917275004901',
    agentName: 'Vikas Verma (Agent #102)',
    agentPhone: '+919876543210',
    propertyInterest: 'एयरपोर्ट चकेरी साइट (Plot #14)',
    budget: '₹ 15 - 20 Lakh (200 गज)',
    status: 'new',
    statusLabel: 'New Lead',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    time: '15 mins ago',
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
    statusLabel: 'Call Done',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    time: '45 mins ago',
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
    statusLabel: 'Visit Planned',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    time: '2 hours ago',
  },
];

export default function RMDashboardView({ onNavigate = () => {} }) {
  const [kpis, setKpis] = useState(DEFAULT_KPIS);
  const [recentLeads, setRecentLeads] = useState(FALLBACK_LEADS);
  const [updatingId, setUpdatingId] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    let isMounted = true;

    // Fetch live Dashboard KPIs
    rmService.getDashboard().then((data) => {
      if (isMounted && data) {
        setKpis([
          {
            id: 'leads',
            label: 'Agent Leads',
            value: String(data.totalLeads ?? 18),
            trend: 'Live',
            bgTint: '#E0F2FE',
            iconColor: '#0284C7',
            route: 'customers',
            icon: DEFAULT_KPIS[0].icon,
          },
          {
            id: 'agents',
            label: 'Managed Agents',
            value: String(data.totalAgents ?? 6),
            trend: 'Active',
            bgTint: '#FFEDD5',
            iconColor: '#EA580C',
            route: 'more',
            icon: DEFAULT_KPIS[1].icon,
          },
          {
            id: 'visits',
            label: 'Site Visits',
            value: String(data.pendingVisits ?? 4),
            trend: 'Pending Cab',
            bgTint: '#FEF3C7',
            iconColor: '#D97706',
            route: 'visits',
            icon: DEFAULT_KPIS[2].icon,
          },
          {
            id: 'bookings',
            label: 'Plot Bookings',
            value: String(data.pendingBookings ?? 3),
            trend: 'Review',
            bgTint: '#F3E8FF',
            iconColor: '#9333EA',
            route: 'more',
            icon: DEFAULT_KPIS[3].icon,
          },
        ]);
      }
    });

    // Fetch live Customer Leads added by Agents
    rmService.getLeads().then((leads) => {
      if (isMounted && Array.isArray(leads) && leads.length > 0) {
        const formatted = leads.slice(0, 5).map((l) => {
          const statusMap = {
            new: { label: 'New Lead', bg: '#DCFCE7', color: '#16A34A' },
            contacted: { label: 'Call Done', bg: '#DBEAFE', color: '#2563EB' },
            visit_scheduled: { label: 'Visit Planned', bg: '#FEF3C7', color: '#D97706' },
            booked: { label: 'Booked', bg: '#F3E8FF', color: '#9333EA' },
            lost: { label: 'Lost', bg: '#FEE2E2', color: '#DC2626' },
          };
          const st = statusMap[l.status] || statusMap.new;

          return {
            id: l._id,
            customerName: l.name,
            customerPhone: l.phone,
            agentName: l.assignedAgent?.name ? `${l.assignedAgent.name} (Agent)` : 'Assigned Agent',
            agentPhone: l.assignedAgent?.phone || '',
            propertyInterest: l.interestedLand ? `Land Scheme #${l.interestedLand}` : (l.preferredLocation || 'Verified Plots'),
            budget: l.budget ? `Budget: ${l.budget}` : 'Budget Discussion Pending',
            status: l.status,
            statusLabel: st.label,
            statusBg: st.bg,
            statusColor: st.color,
            time: new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          };
        });
        setRecentLeads(formatted);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleQuickContacted = async (leadId) => {
    setUpdatingId(leadId);
    try {
      await rmService.updateLead(leadId, {
        status: 'contacted',
        notes: `RM contacted customer on ${new Date().toLocaleDateString('hi-IN')}`,
      });
      setRecentLeads((prev) =>
        prev.map((item) =>
          item.id === leadId
            ? { ...item, status: 'contacted', statusLabel: 'Call Done', statusBg: '#DBEAFE', statusColor: '#2563EB' }
            : item
        )
      );
      setFeedback('Customer marked as Contacted successfully!');
      setTimeout(() => setFeedback(''), 3000);
    } catch (err) {
      console.warn('Fallback update:', err.message);
      setRecentLeads((prev) =>
        prev.map((item) =>
          item.id === leadId
            ? { ...item, status: 'contacted', statusLabel: 'Call Done', statusBg: '#DBEAFE', statusColor: '#2563EB' }
            : item
        )
      );
      setFeedback('Status updated locally.');
      setTimeout(() => setFeedback(''), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="rm-main-content rm-dashboard-view">
      {/* 1. RM Hero Banner Card */}
      <div
        className="rm-hero-card gpu-accel"
        style={{
          background: 'linear-gradient(135deg, #0F172A 0%, #172554 100%)',
          borderRadius: '20px',
          padding: '16px 14px',
          color: '#FFFFFF',
          marginBottom: '16px',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 8px 20px rgba(15, 23, 42, 0.16)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', zIndex: 2, flex: 1, minWidth: 0 }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              backgroundColor: '#D97706',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 10px rgba(217, 119, 6, 0.4)',
              flexShrink: 0,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="#FFFFFF">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"></path>
            </svg>
          </div>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: '800', margin: 0, letterSpacing: '-0.02em', color: '#FFFFFF' }}>
              RM Relationship Desk
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Agent Leads ➔ Direct Customer Contact
            </p>
          </div>
        </div>

        {/* Status Pill Badge (Replacing Villa Image) */}
        <div style={{ zIndex: 2, flexShrink: 0 }}>
          <span
            style={{
              backgroundColor: 'rgba(217, 119, 6, 0.25)',
              border: '1px solid #D97706',
              color: '#FDE68A',
              fontSize: '11px',
              fontWeight: '800',
              padding: '6px 12px',
              borderRadius: '9999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22C55E' }}></span>
            RM Active
          </span>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {feedback && (
        <div
          style={{
            backgroundColor: '#DCFCE7',
            border: '1px solid #86EFAC',
            color: '#15803D',
            padding: '8px 12px',
            borderRadius: '10px',
            fontSize: '11.5px',
            fontWeight: '700',
            marginBottom: '12px',
          }}
        >
          ✅ {feedback}
        </div>
      )}

      {/* 2. 4 Metric KPI Cards (2x2 Grid) */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
        {kpis.map((kpi) => (
          <div
            key={kpi.id}
            className="rm-pressable"
            onClick={() => onNavigate(kpi.route)}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '94px',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '10px',
                  backgroundColor: kpi.bgTint,
                  color: kpi.iconColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {kpi.icon}
              </div>
              <span style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700' }}>›</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: 1 }}>
                {kpi.value}
              </span>
              {kpi.trend && (
                <span style={{ fontSize: '10.5px', fontWeight: '700', color: '#16A34A' }}>
                  {kpi.trend}
                </span>
              )}
            </div>

            <span style={{ fontSize: '11px', fontWeight: '600', color: '#64748B', marginTop: '3px' }}>
              {kpi.label}
            </span>
          </div>
        ))}
      </div>

      {/* 3. Incoming Agent Leads to Contact (Central RM Workflow) */}
      <div style={{ marginBottom: '22px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', padding: '0 2px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Agent Leads to Contact
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              Direct leads received from on-ground Agents
            </span>
          </div>
          <button
            type="button"
            onClick={() => onNavigate('customers')}
            style={{
              background: 'none',
              border: 'none',
              color: '#D97706',
              fontSize: '11.5px',
              fontWeight: '700',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            View All ({recentLeads.length}) &gt;
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentLeads.map((lead) => (
            <div
              key={lead.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              }}
            >
              {/* Agent Attribution Banner */}
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
                  👤 Added by: <strong style={{ color: '#0F172A' }}>{lead.agentName}</strong>
                </span>
                <span
                  style={{
                    backgroundColor: lead.statusBg,
                    color: lead.statusColor,
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {lead.statusLabel}
                </span>
              </div>

              {/* Customer Details */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                  {lead.customerName}
                </h4>
                <span style={{ fontSize: '11px', color: '#64748B' }}>{lead.customerPhone}</span>
              </div>

              <div style={{ fontSize: '12px', color: '#334155', marginBottom: '4px' }}>
                🏞️ {lead.propertyInterest}
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '12px' }}>
                💰 {lead.budget} • <span style={{ color: '#94A3B8' }}>{lead.time}</span>
              </div>

              {/* Action Buttons for RM: Direct Call, WhatsApp & Mark Contacted */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                <a
                  href={`tel:${lead.customerPhone}`}
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
                  href={`https://wa.me/${lead.customerPhone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(lead.customerName)},%20I%20am%20your%20Relationship%20Manager%20from%20Shubharambh%20Realty%20regarding%20your%20interest%20in%20our%20land%20schemes.`}
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

                {lead.status !== 'contacted' && (
                  <button
                    type="button"
                    onClick={() => handleQuickContacted(lead.id)}
                    disabled={updatingId === lead.id}
                    style={{
                      flex: 1,
                      backgroundColor: '#FEF3C7',
                      color: '#B45309',
                      border: '1px solid #FDE68A',
                      fontSize: '11px',
                      fontWeight: '700',
                      padding: '8px 0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                  >
                    {updatingId === lead.id ? 'Saving...' : '✓ Mark Done'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

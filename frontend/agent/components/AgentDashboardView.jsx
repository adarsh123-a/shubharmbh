import React, { useState, useEffect } from 'react';
import AgentAddPropertyModal from './AgentAddPropertyModal.jsx';
import { agentService } from '../services/agentService.js';

const FALLBACK_TRANSACTIONS = [
  {
    id: 'tx-1',
    plot: 'एयरपोर्ट चकेरी साइट • Plot #14',
    customer: 'Rahul Sharma',
    saleAmount: '₹ 10,00,000',
    percentage: '5%',
    commissionEarned: '₹ 50,000',
    status: 'Paid',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
    date: '28 Oct 2026',
  },
  {
    id: 'tx-2',
    plot: 'अवध ग्रीन सिटी • Plot #08',
    customer: 'Amit Mishra',
    saleAmount: '₹ 8,00,000',
    percentage: '5%',
    commissionEarned: '₹ 40,000',
    status: 'Approved',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
    date: '15 Oct 2026',
  },
  {
    id: 'tx-3',
    plot: 'कानपुर रोड प्रोजेक्ट • Plot #22',
    customer: 'Preeti Kumar',
    saleAmount: '₹ 12,00,000',
    percentage: '5%',
    commissionEarned: '₹ 60,000',
    status: 'In Verification',
    statusBg: '#FEF3C7',
    statusColor: '#D97706',
    date: '02 Nov 2026',
  },
];

export default function AgentDashboardView({ onNavigate = () => {} }) {
  const [availablePropsCount, setAvailablePropsCount] = useState(4);
  const [soldCount, setSoldCount] = useState(2);
  const [totalCommission, setTotalCommission] = useState('₹ 90,000');
  const [transactions, setTransactions] = useState(FALLBACK_TRANSACTIONS);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let isMounted = true;

    // 1. Fetch available properties count
    agentService.getProperties().then((props) => {
      if (isMounted && Array.isArray(props)) {
        setAvailablePropsCount(props.length > 0 ? props.length : 4);
      }
    });

    // 2. Fetch agent performance dashboard stats
    agentService.getDashboard().then((dash) => {
      if (isMounted && dash) {
        setSoldCount(dash.approvedBookings ?? 2);
        if (dash.totalCommissionEarned) {
          setTotalCommission(`₹ ${dash.totalCommissionEarned.toLocaleString('en-IN')}`);
        }
      }
    });

    // 3. Fetch bookings & percentage commission transaction history
    agentService.getBookings().then((bookings) => {
      if (isMounted && Array.isArray(bookings) && bookings.length > 0) {
        const mapped = bookings.map((b) => {
          const statusMap = {
            approved: { label: 'Approved', bg: '#DBEAFE', color: '#2563EB' },
            registry_done: { label: 'Paid', bg: '#DCFCE7', color: '#16A34A' },
            pending_admin: { label: 'Admin Review', bg: '#FEF3C7', color: '#D97706' },
            pending_rm: { label: 'RM Review', bg: '#FEF3C7', color: '#D97706' },
            rejected: { label: 'Rejected', bg: '#FEE2E2', color: '#DC2626' },
          };
          const st = statusMap[b.status] || { label: b.status, bg: '#F1F5F9', color: '#64748B' };
          const pct = b.commissionPercentage || 5;
          const comm = b.commissionAmount || Math.round(((b.totalPrice || 0) * pct) / 100);

          return {
            id: b._id,
            plot: `${b.siteName || 'Land Project'} • Plot #${b.plotId}`,
            customer: b.customerName || 'Customer',
            saleAmount: b.totalPrice ? `₹ ${b.totalPrice.toLocaleString('en-IN')}` : '₹ 10,00,000',
            percentage: `${pct}%`,
            commissionEarned: `₹ ${comm.toLocaleString('en-IN')}`,
            status: st.label,
            statusBg: st.bg,
            statusColor: st.color,
            date: new Date(b.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
          };
        });
        setTransactions(mapped);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleLeadAdded = (newLead) => {
    setNotice(`Customer "${newLead.name}" added successfully! Lead forwarded to RM.`);
    setTimeout(() => setNotice(''), 4000);
  };

  return (
    <div className="agent-main-content agent-dashboard-view">
      {/* 1. Agent Hero Banner (Clean, No Photo) */}
      <div
        className="agent-hero-card gpu-accel"
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
              Agent Partner Desk
            </h2>
            <p style={{ fontSize: '11px', margin: '3px 0 0', color: '#CBD5E1', fontWeight: '500' }}>
              Sales, Commission Payouts & Leads
            </p>
          </div>
        </div>

        {/* Clean Agent Partner Status Pill */}
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
            Active Agent
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

      {/* 2. Three Core KPI Details Required by User */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '8px',
          marginBottom: '16px',
        }}
      >
        {/* Detail 1: Total Available Properties */}
        <div
          onClick={() => onNavigate('properties')}
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block' }}>
            Available Properties
          </span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>
            {availablePropsCount}
          </div>
          <span style={{ fontSize: '9.5px', color: '#0284C7', fontWeight: '700', marginTop: '2px', display: 'block' }}>
            View Catalog ›
          </span>
        </div>

        {/* Detail 2: Properties Sold Count */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block' }}>
            Properties Sold
          </span>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#16A34A', marginTop: '4px' }}>
            {soldCount} Sold
          </div>
          <span style={{ fontSize: '9.5px', color: '#16A34A', fontWeight: '700', marginTop: '2px', display: 'block' }}>
            Closed Deals
          </span>
        </div>

        {/* Detail 3: Commission Earned (% Payout) */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '14px',
            padding: '12px 10px',
            border: '1px solid #E2E8F0',
            boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            textAlign: 'center',
          }}
        >
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#64748B', display: 'block' }}>
            Payment / Commission
          </span>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#9333EA', marginTop: '6px' }}>
            {totalCommission}
          </div>
          <span style={{ fontSize: '9.5px', color: '#9333EA', fontWeight: '700', marginTop: '2px', display: 'block' }}>
            @ 5% Payout
          </span>
        </div>
      </div>

      {/* 3. Direct Add Customer Lead Button (Strictly Name, Email, Phone) */}
      <div style={{ marginBottom: '18px' }}>
        <button
          type="button"
          onClick={() => setIsAddLeadOpen(true)}
          style={{
            width: '100%',
            backgroundColor: '#D97706',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '14px',
            padding: '12px',
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.25)',
          }}
        >
          <span>➕ Add Customer Lead (Name, Email, Phone)</span>
        </button>
      </div>

      {/* 4. Transaction History: Properties Sold & Percentage Commission */}
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', padding: '0 2px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
              Transaction & Commission History
            </h3>
            <span style={{ fontSize: '11px', color: '#64748B' }}>
              Payout received per property sold by percentage rate
            </span>
          </div>
          <span style={{ fontSize: '11px', color: '#D97706', fontWeight: '800' }}>
            {transactions.length} Records
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '14px',
                padding: '12px 14px',
                border: '1px solid #E2E8F0',
                boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A' }}>
                  🏞️ {tx.plot}
                </span>
                <span
                  style={{
                    backgroundColor: tx.statusBg,
                    color: tx.statusColor,
                    fontSize: '10px',
                    fontWeight: '800',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                  }}
                >
                  {tx.status}
                </span>
              </div>

              <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '8px' }}>
                Customer: <strong>{tx.customer}</strong> • Date: {tx.date}
              </div>

              {/* Payout & Percentage Breakdown */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#F8FAFC',
                  borderRadius: '8px',
                  padding: '8px 10px',
                  border: '1px solid #F1F5F9',
                }}
              >
                <div>
                  <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>Sale Value</span>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: '#334155' }}>
                    {tx.saleAmount}
                  </span>
                </div>

                <div style={{ textAlign: 'center' }}>
                  <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>Commission Rate</span>
                  <span
                    style={{
                      fontSize: '11.5px',
                      fontWeight: '800',
                      color: '#B45309',
                      backgroundColor: '#FEF3C7',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                  >
                    {tx.percentage}
                  </span>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '10px', color: '#64748B', display: 'block' }}>Payment Received</span>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#16A34A' }}>
                    {tx.commissionEarned}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Lead Modal (Strictly Name, Email, Phone) */}
      <AgentAddPropertyModal
        isOpen={isAddLeadOpen}
        onClose={() => setIsAddLeadOpen(false)}
        onAddLead={handleLeadAdded}
      />
    </div>
  );
}

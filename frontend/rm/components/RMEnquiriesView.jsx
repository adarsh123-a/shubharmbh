import React, { useState, useEffect } from 'react';
import { rmService } from '../services/rmService.js';

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#0D9488',
    name: 'Rahul Sharma',
    detail: 'एयरपोर्ट चकेरी साइट (Plot #14)',
    budget: '₹ 15 - 20 Lakh (200 गज)',
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
    detail: 'अवध ग्रीन सिटी लैंड प्रोजेक्ट',
    budget: '₹ 12 Lakh (150 गज)',
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
    detail: 'कानपुर रोड कमर्शियल प्लॉट्स',
    budget: '₹ 25 Lakh (300 गज)',
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
    detail: 'गंगा बैराज फार्मलैंड व प्लॉट्स',
    budget: '₹ 18 Lakh (250 गज)',
    badgeText: 'Follow Up',
    badgeBg: '#FFE4E6',
    badgeColor: '#E11D48',
    time: '2 hours ago',
    phone: '+917275004901',
    category: 'follow_up',
  },
];

export default function RMEnquiriesView() {
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    rmService.getLeads().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((l) => {
          const initials = l.name ? l.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'LE';
          const catMap = {
            new: 'new',
            contacted: 'interested',
            visit_scheduled: 'site_visit',
            booked: 'follow_up',
            lost: 'follow_up',
          };
          const badgeMap = {
            new: { text: 'New', bg: '#DCFCE7', color: '#16A34A' },
            contacted: { text: 'Contacted', bg: '#DBEAFE', color: '#2563EB' },
            visit_scheduled: { text: 'Site Visit', bg: '#FEF3C7', color: '#D97706' },
            booked: { text: 'Booked', bg: '#F3E8FF', color: '#9333EA' },
            lost: { text: 'Lost', bg: '#FEE2E2', color: '#DC2626' },
          };
          const b = badgeMap[l.status] || badgeMap.new;

          return {
            id: l._id,
            initials,
            avatarBg: '#D97706',
            name: l.name,
            detail: l.interestedLand ? `Land Scheme #${l.interestedLand}` : (l.preferredLocation || 'Verified Plots'),
            budget: l.budget ? `Budget: ${l.budget}` : 'Budget Discussion',
            badgeText: b.text,
            badgeBg: b.bg,
            badgeColor: b.color,
            time: new Date(l.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            phone: l.phone,
            category: catMap[l.status] || 'new',
          };
        });
        setEnquiries(mapped);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = enquiries.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  return (
    <div className="rm-main-content rm-enquiries-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Agent Enquiries Pipeline
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Total {enquiries.length} Active Client Leads
        </span>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '14px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: `All (${enquiries.length})` },
          { id: 'new', label: 'New' },
          { id: 'interested', label: 'Interested / Call' },
          { id: 'site_visit', label: 'Site Visit' },
          { id: 'follow_up', label: 'Follow Up' },
        ].map((tab) => {
          const isActive = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              className={`rm-pressable ${isActive ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                backgroundColor: isActive ? '#0F172A' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: isActive ? '#0F172A' : '#E2E8F0',
                borderRadius: '9999px',
                padding: '6px 12px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Enquiries List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '12px 14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: item.avatarBg,
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: '800',
                    fontSize: '13px',
                  }}
                >
                  {item.initials}
                </div>
                <div>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
                    {item.name}
                  </h4>
                  <span style={{ fontSize: '10.5px', color: '#64748B' }}>
                    {item.time}
                  </span>
                </div>
              </div>

              <span
                style={{
                  backgroundColor: item.badgeBg,
                  color: item.badgeColor,
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 9px',
                  borderRadius: '9999px',
                }}
              >
                {item.badgeText}
              </span>
            </div>

            <div style={{ fontSize: '11.5px', color: '#334155', fontWeight: '600', marginBottom: '3px' }}>
              🏞️ {item.detail}
            </div>
            <div style={{ fontSize: '11px', color: '#64748B', marginBottom: '10px' }}>
              💰 {item.budget}
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '8px' }}>
              <a
                href={`tel:${item.phone}`}
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#EFF6FF',
                  color: '#2563EB',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '7px 0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}
              >
                📞 Call Client
              </a>
              <a
                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20Relationship%20Manager%20here%20from%20Shubharambh%20Realty`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: 'center',
                  backgroundColor: '#DCFCE7',
                  color: '#16A34A',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '7px 0',
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
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { agentService } from '../services/agentService.js';

const INITIAL_ENQUIRIES = [
  {
    id: 'enq-1',
    initials: 'RS',
    avatarBg: '#8B5CF6',
    name: 'Rahul Sharma',
    detail: 'एयरपोर्ट चकेरी साइट (Plot #14)',
    budget: '₹ 15 - 20 Lakh (200 गज)',
    badgeText: 'New Lead',
    badgeBg: '#DCFCE7',
    badgeColor: '#16A34A',
    time: '15 mins ago',
    phone: '+917275004901',
    category: 'new',
  },
  {
    id: 'enq-2',
    initials: 'SP',
    avatarBg: '#F59E0B',
    name: 'Sunita Patel',
    detail: 'अवध ग्रीन सिटी लैंड प्रोजेक्ट',
    budget: '₹ 12 Lakh (150 गज)',
    badgeText: 'Call Done',
    badgeBg: '#DBEAFE',
    badgeColor: '#2563EB',
    time: '1 hour ago',
    phone: '+917275004901',
    category: 'callback',
  },
  {
    id: 'enq-3',
    initials: 'AM',
    avatarBg: '#7C3AED',
    name: 'Amit Mishra',
    detail: 'कानपुर रोड प्रोजेक्ट',
    budget: '₹ 25 Lakh (300 गज)',
    badgeText: 'Visit Planned',
    badgeBg: '#FEF3C7',
    badgeColor: '#D97706',
    time: '2 hours ago',
    phone: '+917275004901',
    category: 'interested',
  },
];

export default function AgentEnquiriesView() {
  const [enquiries, setEnquiries] = useState(INITIAL_ENQUIRIES);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    let isMounted = true;
    agentService.getCustomers().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const mapped = data.map((item) => {
          const initials = item.name ? item.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() : 'CU';
          return {
            id: item._id,
            initials,
            avatarBg: '#D97706',
            name: item.name,
            detail: item.interestedLand ? `Land Scheme #${item.interestedLand}` : (item.preferredLocation || 'Verified Plot Inquiry'),
            budget: item.budget ? `Budget: ${item.budget}` : 'Plot Buyer',
            badgeText: item.status === 'booked' ? 'Booked' : (item.status === 'contacted' ? 'Call Done' : 'New Lead'),
            badgeBg: item.status === 'booked' ? '#F3E8FF' : (item.status === 'contacted' ? '#DBEAFE' : '#DCFCE7'),
            badgeColor: item.status === 'booked' ? '#9333EA' : (item.status === 'contacted' ? '#2563EB' : '#16A34A'),
            time: new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            phone: item.phone,
            category: item.status === 'contacted' ? 'callback' : 'new',
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
    <div className="agent-main-content agent-enquiries-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Client Enquiries
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          Total {enquiries.length} Active Leads
        </span>
      </div>

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
                href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(item.name)},%20I%20am%20your%20property%20agent%20from%20Shubharambh%20Realty`}
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

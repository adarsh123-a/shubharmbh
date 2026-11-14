import React, { useState, useEffect } from 'react';
import { rmService } from '../services/rmService.js';

const FALLBACK_PROPERTIES = [
  {
    id: 'land-10',
    landId: '10',
    title: 'एयरपोर्ट चकेरी साइट',
    location: 'चकेरी, कानपुर, उत्तर प्रदेश',
    latitude: '26.4095280',
    longitude: '80.3894150',
    totalPlots: 48,
    availablePlots: 32,
    specs: '48 Plots • 100 to 300 गज • Immediate Registry',
    price: '₹ 4,500 / गज Onwards',
    status: 'Available',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'land-11',
    landId: '11',
    title: 'अवध ग्रीन सिटी लैंड प्रोजेक्ट',
    location: 'सुल्तानपुर रोड, लखनऊ',
    latitude: '26.7812000',
    longitude: '81.0142000',
    totalPlots: 65,
    availablePlots: 44,
    specs: '65 Plots • 150 to 500 गज • Clear Title & RERA Verified',
    price: '₹ 5,200 / गज Onwards',
    status: 'Available',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
  {
    id: 'land-12',
    landId: '12',
    title: 'कानपुर रोड कमर्शियल एवं आवासीय प्लॉट्स',
    location: 'सरोजिनी नगर, कानपुर रोड, लखनऊ',
    latitude: '26.7451000',
    longitude: '80.8654000',
    totalPlots: 36,
    availablePlots: 0,
    specs: '36 Plots • 200 to 600 गज • 100% Sold Out',
    price: '₹ 6,000 / गज Onwards',
    status: 'Sold Out',
    statusBg: '#DBEAFE',
    statusColor: '#2563EB',
  },
  {
    id: 'land-13',
    landId: '13',
    title: 'गंगा बैराज फार्मलैंड व प्लॉट्स',
    location: 'गंगा बैराज रोड, कानपुर',
    latitude: '26.5124000',
    longitude: '80.3341000',
    totalPlots: 28,
    availablePlots: 28,
    specs: '28 Plots • 250 to 1000 गज • Master Layout Approved',
    price: '₹ 3,800 / गज Onwards',
    status: 'Available',
    statusBg: '#DCFCE7',
    statusColor: '#16A34A',
  },
];

export default function RMPropertiesView({ onNavigate = () => {} }) {
  const [propertiesList, setPropertiesList] = useState(FALLBACK_PROPERTIES);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  // Fetch live available properties from backend
  useEffect(() => {
    let isMounted = true;
    rmService.getProperties().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item) => {
          const totalPlots = Array.isArray(item.plots) ? item.plots.length : 0;
          const availablePlots = Array.isArray(item.plots)
            ? item.plots.filter((p) => (p.status || 'available').toLowerCase() === 'available').length
            : 0;
          const isSold = totalPlots > 0 && availablePlots === 0;

          return {
            id: `land-${item.land || item._id}`,
            landId: String(item.land || ''),
            title: item.side_name || 'Land Project',
            location: item.location || 'कानपुर / लखनऊ, उत्तर प्रदेश',
            latitude: item.lat || '26.4095280',
            longitude: item.lng || '80.3894150',
            totalPlots,
            availablePlots,
            specs: `${totalPlots} Plots • 100 to 500 गज • Clear Title`,
            price: item.price || '₹ 4,500 / गज Onwards',
            status: isSold ? 'Sold Out' : 'Available',
            statusBg: isSold ? '#DBEAFE' : '#DCFCE7',
            statusColor: isSold ? '#2563EB' : '#16A34A',
          };
        });
        setPropertiesList(formatted);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const totalSchemes = propertiesList.length;
  const totalAvailablePlots = propertiesList.reduce((acc, p) => acc + (p.availablePlots || 0), 0);

  const filtered = propertiesList.filter((p) => {
    const matchesFilter = filter === 'all' || (filter === 'available' ? p.availablePlots > 0 : p.availablePlots === 0);
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.landId.includes(search);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="rm-main-content rm-properties-view">
      <div style={{ marginBottom: '14px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0 }}>
          Land Schemes & Inventory
        </h2>
        <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
          {totalSchemes} Active Projects • {totalAvailablePlots} Available Plots for Customer Booking
        </span>
      </div>

      {/* Stats Summary Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10.5px', color: '#64748B', fontWeight: '700' }}>Total Projects</span>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
            {totalSchemes} Schemes
          </div>
        </div>
        <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #BBF7D0', padding: '10px 12px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10.5px', color: '#16A34A', fontWeight: '700' }}>Available Plots</span>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#16A34A', marginTop: '2px' }}>
            {totalAvailablePlots} Plots
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
        {[
          { id: 'all', label: `All (${propertiesList.length})` },
          { id: 'available', label: 'Available Plots' },
          { id: 'sold', label: 'Sold Out' },
        ].map((tab) => {
          const isActive = filter === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              style={{
                backgroundColor: isActive ? '#0F172A' : '#FFFFFF',
                color: isActive ? '#FFFFFF' : '#475569',
                border: '1px solid',
                borderColor: isActive ? '#0F172A' : '#CBD5E1',
                borderRadius: '9999px',
                padding: '5px 12px',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by scheme name, land id or location..."
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

      {/* Property Cards List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {filtered.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span
                  style={{
                    backgroundColor: '#FEF3C7',
                    color: '#B45309',
                    fontSize: '10.5px',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '6px',
                  }}
                >
                  Land #{item.landId}
                </span>
                <span style={{ fontSize: '11px', color: '#64748B' }}>
                  ({item.latitude}, {item.longitude})
                </span>
              </div>
              <span
                style={{
                  backgroundColor: item.statusBg,
                  color: item.statusColor,
                  fontSize: '10px',
                  fontWeight: '800',
                  padding: '2px 8px',
                  borderRadius: '9999px',
                }}
              >
                {item.status}
              </span>
            </div>

            <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px' }}>
              {item.title}
            </h4>

            <div style={{ fontSize: '11.5px', color: '#475569', marginBottom: '8px' }}>
              📍 {item.location}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#F8FAFC',
                borderRadius: '8px',
                padding: '8px 10px',
                marginBottom: '10px',
                border: '1px solid #F1F5F9',
              }}
            >
              <div>
                <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Availability</span>
                <strong style={{ fontSize: '12px', color: item.availablePlots > 0 ? '#16A34A' : '#DC2626' }}>
                  {item.availablePlots} of {item.totalPlots} Plots Left
                </strong>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', color: '#64748B', display: 'block' }}>Starting Rate</span>
                <strong style={{ fontSize: '12px', color: '#D97706' }}>{item.price}</strong>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
              <button
                type="button"
                onClick={() => {
                  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.latitude + ',' + item.longitude)}`;
                  window.open(mapsUrl, '_blank');
                }}
                style={{
                  flex: 1,
                  backgroundColor: '#F1F5F9',
                  color: '#0F172A',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '7px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                🗺️ View GPS Location
              </button>
              <button
                type="button"
                onClick={() => onNavigate('customers')}
                style={{
                  flex: 1,
                  backgroundColor: '#D97706',
                  color: '#FFFFFF',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '7px 0',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                👥 Match Customers
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

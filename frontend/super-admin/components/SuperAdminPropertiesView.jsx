import React, { useState, useEffect } from 'react';
import SuperAdminAddPropertyModal from './SuperAdminAddPropertyModal.jsx';
import SuperAdminEditPropertyModal from './SuperAdminEditPropertyModal.jsx';
import { superAdminService } from '../services/superAdminService.js';

export default function SuperAdminPropertiesView({ onNavigate = () => {} }) {
  const [inventoryList, setInventoryList] = useState([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [notice, setNotice] = useState('');

  // Fetch live properties from backend
  useEffect(() => {
    let isMounted = true;
    superAdminService.getProperties().then((data) => {
      if (isMounted && Array.isArray(data) && data.length > 0) {
        const formatted = data.map((item) => {
          const totalPlots = Array.isArray(item.plots) ? item.plots.length : 0;
          const availablePlots = Array.isArray(item.plots)
            ? item.plots.filter((p) => (p.status || 'available').toLowerCase() === 'available').length
            : 0;

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
            status: item.status === 'true' || item.status === true ? 'For Sale' : (item.status === 'sold' ? 'Sold' : 'Draft'),
            statusBg: item.status === 'sold' ? '#DBEAFE' : (item.status === 'true' || item.status === true ? '#DCFCE7' : '#F1F5F9'),
            statusColor: item.status === 'sold' ? '#2563EB' : (item.status === 'true' || item.status === true ? '#16A34A' : '#64748B'),
          };
        });
        setInventoryList(formatted);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  const filtered = inventoryList.filter((item) => {
    const matchesFilter = filter === 'all' || item.status.toLowerCase() === filter.toLowerCase();
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) ||
                          item.location.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleAddProperty = (newProp) => {
    setInventoryList((prev) => [newProp, ...prev]);
    setNotice(`Land project "${newProp.title}" listed successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleUpdateProperty = (updated) => {
    setInventoryList((prev) => prev.map((p) => (p.landId === updated.landId ? updated : p)));
    setNotice(`Land project "${updated.title}" updated successfully!`);
    setTimeout(() => setNotice(''), 4000);
  };

  const handleDeleteProperty = async (landId, title) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${title}" (Land #${landId})?`)) {
      return;
    }
    try {
      await superAdminService.deleteProperty(landId);
      setInventoryList((prev) => prev.filter((p) => p.landId !== String(landId)));
      setNotice(`Land project "${title}" deleted successfully!`);
      setTimeout(() => setNotice(''), 4000);
    } catch (err) {
      console.warn('Backend delete fallback:', err.message);
      setInventoryList((prev) => prev.filter((p) => p.landId !== String(landId)));
      setNotice(`Land project "${title}" removed locally.`);
      setTimeout(() => setNotice(''), 4000);
    }
  };

  return (
    <div className="super-admin-main-content super-admin-properties-view">
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

      {/* Header with Title and Add Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: 0, letterSpacing: '-0.02em' }}>
            Land Schemes & Inventory
          </h2>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
            {inventoryList.length} Active Master Plots & Schemes
          </span>
        </div>
        <button
          type="button"
          className="super-admin-btn-primary"
          onClick={() => setIsAddOpen(true)}
          style={{ padding: '7px 14px', fontSize: '11.5px' }}
        >
          <span>+ Add Scheme</span>
        </button>
      </div>

      {/* KPI Stats Strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
        <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10px', color: '#64748B', fontWeight: '700', display: 'block' }}>TOTAL PROJECTS</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{inventoryList.length}</span>
        </div>
        <div style={{ backgroundColor: '#F0FDF4', border: '1px solid #DCFCE7', padding: '10px 12px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10px', color: '#15803D', fontWeight: '700', display: 'block' }}>FOR SALE (LIVE)</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#15803D' }}>
            {inventoryList.filter((p) => p.status === 'For Sale').length}
          </span>
        </div>
        <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #DBEAFE', padding: '10px 12px', borderRadius: '12px' }}>
          <span style={{ fontSize: '10px', color: '#1D4ED8', fontWeight: '700', display: 'block' }}>SOLD / BOOKED</span>
          <span style={{ fontSize: '18px', fontWeight: '800', color: '#1D4ED8' }}>
            {inventoryList.filter((p) => p.status === 'Sold').length}
          </span>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search land project by title or location..."
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

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '12px', overflowX: 'auto', paddingBottom: '2px' }}>
        {[
          { id: 'all', label: `All Schemes (${inventoryList.length})` },
          { id: 'for sale', label: `For Sale (${inventoryList.filter((p) => p.status === 'For Sale').length})` },
          { id: 'sold', label: `Sold (${inventoryList.filter((p) => p.status === 'Sold').length})` },
          { id: 'draft', label: 'Draft' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setFilter(tab.id)}
            style={{
              padding: '5px 12px',
              borderRadius: '9999px',
              border: filter === tab.id ? '1px solid #D97706' : '1px solid #CBD5E1',
              backgroundColor: filter === tab.id ? '#D97706' : '#FFFFFF',
              color: filter === tab.id ? '#FFFFFF' : '#475569',
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

      {/* Listings */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '11px' }}>
        {filtered.length === 0 ? (
          <div style={{ padding: '36px 16px', textAlign: 'center', backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', color: '#64748B' }}>
            <div style={{ fontSize: '28px', marginBottom: '8px' }}>🏗️</div>
            <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#1E293B', margin: '0 0 4px' }}>No Land Schemes Found</h4>
            <p style={{ fontSize: '12px', margin: 0 }}>Click "+ Add Scheme" to publish a new land project to the portal.</p>
          </div>
        ) : (
          filtered.map((prop) => (
          <div
            key={prop.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              padding: '14px 16px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 2px 6px rgba(15, 23, 42, 0.04)',
              display: 'flex',
              flexDirection: 'column',
              gap: '9px',
            }}
          >
            {/* Header: Land ID & Title + Status */}
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                <span
                  style={{
                    backgroundColor: '#FEF3C7',
                    color: '#B45309',
                    fontSize: '11px',
                    fontWeight: '800',
                    padding: '3px 8px',
                    borderRadius: '8px',
                    letterSpacing: '0.3px',
                    flexShrink: 0,
                  }}
                >
                  {prop.landId ? `Land #${prop.landId}` : 'Land Plot'}
                </span>
                <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {prop.title}
                </h4>
              </div>
              <span
                style={{
                  backgroundColor: prop.statusBg,
                  color: prop.statusColor,
                  fontSize: '10.5px',
                  fontWeight: '800',
                  padding: '3px 10px',
                  borderRadius: '9999px',
                  flexShrink: 0,
                }}
              >
                {prop.status}
              </span>
            </div>

            {/* Location & Coordinates */}
            <div style={{ fontSize: '11.5px', color: '#475569', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '6px' }}>
              <span>📍 {prop.location}</span>
              {prop.latitude && prop.longitude && (
                <span style={{ fontSize: '10px', color: '#0284C7', backgroundColor: '#F0F9FF', padding: '2px 6px', borderRadius: '5px', fontWeight: '700' }}>
                  🌐 {prop.latitude}, {prop.longitude}
                </span>
              )}
            </div>

            {/* Land Specs & Plot Availability */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px', backgroundColor: '#F8FAFC', padding: '7px 10px', borderRadius: '8px', fontSize: '11px' }}>
              <span style={{ color: '#334155', fontWeight: '600' }}>
                📐 {prop.specs}
              </span>
              {prop.availablePlots !== undefined && (
                <span style={{ color: prop.availablePlots > 0 ? '#15803D' : '#DC2626', fontWeight: '700' }}>
                  {prop.availablePlots > 0 ? `🟢 ${prop.availablePlots} Plots Available` : '🔴 Sold Out'}
                </span>
              )}
            </div>

            {/* Price / Rate Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '2px' }}>
              <div>
                <span style={{ fontSize: '10px', color: '#64748B', display: 'block', fontWeight: '600' }}>Rate / Pricing</span>
                <span style={{ fontSize: '14.5px', fontWeight: '800', color: '#0F172A' }}>
                  {prop.price}
                </span>
              </div>
              <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>
                Immediate Registry
              </span>
            </div>

            {/* Super Admin Action Controls: Edit & Delete */}
            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid #F1F5F9', paddingTop: '10px', marginTop: '2px' }}>
              <button
                type="button"
                onClick={() => setEditingProperty(prop)}
                style={{
                  flex: 1,
                  backgroundColor: '#F8FAFC',
                  color: '#0F172A',
                  border: '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '7px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span>✏️ Edit Scheme</span>
              </button>

              <button
                type="button"
                onClick={() => handleDeleteProperty(prop.landId, prop.title)}
                style={{
                  flex: 1,
                  backgroundColor: '#FEE2E2',
                  color: '#DC2626',
                  border: '1px solid #FCA5A5',
                  borderRadius: '8px',
                  padding: '7px 0',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <span>🗑️ Delete Scheme</span>
              </button>
            </div>
          </div>
        )))}
      </div>

      {/* Add Scheme Modal */}
      <SuperAdminAddPropertyModal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        onAddProperty={handleAddProperty}
      />

      {/* Edit Scheme Modal */}
      <SuperAdminEditPropertyModal
        isOpen={!!editingProperty}
        property={editingProperty}
        onClose={() => setEditingProperty(null)}
        onUpdateProperty={handleUpdateProperty}
      />
    </div>
  );
}

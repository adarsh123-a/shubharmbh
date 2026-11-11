import React, { useState } from 'react';
import Header from './components/Header.jsx';
import CustomerHomeView from './components/CustomerHomeView.jsx';
import SearchCard from './components/SearchCard.jsx';
import CategoryGrid from './components/CategoryGrid.jsx';
import MyEnquiriesTracker from './components/MyEnquiriesTracker.jsx';
import MyBookingsCard from './components/MyBookingsCard.jsx';
import BottomNavbar from './components/BottomNavbar.jsx';
import CustomerProfileView from './components/CustomerProfileView.jsx';
import AgentDashboardView from '../agent/components/AgentDashboardView.jsx';

function getCookieRole() {
  if (typeof document === 'undefined') return 'customer';
  const match = document.cookie.match(/(?:^|;\s*)user_role=([^;]*)/);
  return match ? decodeURIComponent(match[1]).toLowerCase() : 'customer';
}

export default function CustomerApp() {
  const [activeTab, setActiveTab] = useState('home');
  const [currentRole, setCurrentRole] = useState(() => getCookieRole());
  const [activeCategory, setActiveCategory] = useState('all');
  const [wishlistCount, setWishlistCount] = useState(3);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [enquirySuccess, setEnquirySuccess] = useState(false);
  const [showHelpCenterModal, setShowHelpCenterModal] = useState(false);
  const [helpCenterSuccess, setHelpCenterSuccess] = useState(false);
  const [selectedProject, setSelectedProject] = useState('');

  const handleSearch = (filterData) => {
    alert(`Searching ${filterData.activeTab.toUpperCase()} properties in "${filterData.location || 'All Locations'}" (${filterData.propertyType}, ${filterData.budget}, ${filterData.bedrooms})`);
  };

  const handleTabSelect = (tab) => {
    setCurrentRole(getCookieRole());
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handlePropertySelect = (property) => {
    setSelectedProperty(property);
  };

  const handleCloseModal = () => {
    setSelectedProperty(null);
    setEnquirySuccess(false);
  };

  const handleEnquirySubmit = (e) => {
    e.preventDefault();
    setEnquirySuccess(true);
    setTimeout(() => {
      handleCloseModal();
    }, 1800);
  };

  return (
    <div className="customer-portal">
      {/* 1. Header with Logo, Search, Wishlist */}
      <Header
        wishlistCount={wishlistCount}
        onSearchClick={() => {
          const el = document.querySelector('.search-text-input');
          if (el) el.focus();
        }}
        onWishlistClick={() => alert(`You have ${wishlistCount} saved properties in your wishlist.`)}
      />

      <main>
        {activeTab === 'home' && (
          <CustomerHomeView
            selectedProject={selectedProject}
            onSelectProject={setSelectedProject}
            onPropertySelect={handlePropertySelect}
          />
        )}

        {(activeTab === 'menu' || activeTab === 'profile') && (
          <CustomerProfileView
            wishlistCount={wishlistCount}
            onNavigateTab={handleTabSelect}
          />
        )}

        {(activeTab === 'dashboard' || activeTab === 'search') && (
          currentRole === 'agent' ? (
            <AgentDashboardView />
          ) : (
            <div className="tab-content-view dashboard-view" key="tab-dashboard">
            <div className="dashboard-heading">
              <span className="dashboard-eyebrow">YOUR PROPERTY ACTIVITY</span>
              <h1>My Dashboard</h1>
              <p>Track your bookings and property enquiries.</p>
            </div>
            <div className="dashboard-summary-grid">
              <article className="dashboard-summary-card booking-summary">
                <div className="dashboard-summary-content">
                  <strong className="dashboard-summary-value">1</strong>
                  <span className="dashboard-summary-label">My Bookings</span>
                  <span className="dashboard-summary-status">1 Confirmed</span>
                </div>
                <a className="dashboard-more-link" href="#dashboard-bookings">
                  More info <span aria-hidden="true">↗</span>
                </a>
              </article>
              <article className="dashboard-summary-card query-summary">
                <div className="dashboard-summary-content">
                  <strong className="dashboard-summary-value">3</strong>
                  <span className="dashboard-summary-label">My Queries</span>
                  <span className="dashboard-summary-status">Across 3 properties</span>
                </div>
                <a className="dashboard-more-link" href="#dashboard-queries">
                  More info <span aria-hidden="true">↗</span>
                </a>
              </article>
              <article className="dashboard-summary-card visit-summary">
                <div className="dashboard-summary-content">
                  <strong className="dashboard-summary-value">1</strong>
                  <span className="dashboard-summary-label">Site Visits</span>
                  <span className="dashboard-summary-status">Visit requested</span>
                </div>
                <a className="dashboard-more-link" href="#dashboard-queries">
                  More info <span aria-hidden="true">↗</span>
                </a>
              </article>
              <article className="dashboard-summary-card saved-summary">
                <div className="dashboard-summary-content">
                  <strong className="dashboard-summary-value">{wishlistCount}</strong>
                  <span className="dashboard-summary-label">Saved Properties</span>
                  <span className="dashboard-summary-status">In your wishlist</span>
                </div>
                <a className="dashboard-more-link" href="#dashboard-queries">
                  More info <span aria-hidden="true">↗</span>
                </a>
              </article>
            </div>
            <div className="dashboard-trackers">
              <div id="dashboard-bookings" className="dashboard-detail-target">
                <MyBookingsCard onViewReceipt={() => alert('Your allotment receipt is not available yet.')} />
              </div>
              <div id="dashboard-queries" className="dashboard-detail-target">
                <MyEnquiriesTracker onViewAll={() => alert('You are viewing your latest enquiries.')} />
              </div>
              <section className="dashboard-table-section" aria-labelledby="dashboard-orders-title">
                <div className="dashboard-table-heading">
                  <h2 id="dashboard-orders-title">My Orders</h2>
                  <span>1 order</span>
                </div>
                <div className="dashboard-table-scroll">
                  <table className="dashboard-data-table">
                    <thead>
                      <tr>
                        <th scope="col">Order ID</th>
                        <th scope="col">Property</th>
                        <th scope="col">Date</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SB12345</td>
                        <td>3 BHK Villa, Unit 12B</td>
                        <td>02 Oct 2026</td>
                        <td><span className="dashboard-table-status confirmed">Confirmed</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
              <section className="dashboard-table-section" aria-labelledby="dashboard-recent-queries-title">
                <div className="dashboard-table-heading">
                  <h2 id="dashboard-recent-queries-title">Recent Queries</h2>
                  <span>3 queries</span>
                </div>
                <div className="dashboard-table-scroll">
                  <table className="dashboard-data-table">
                    <thead>
                      <tr>
                        <th scope="col">Property</th>
                        <th scope="col">Submitted</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>3 BHK in Gomti Nagar</td>
                        <td>12 Oct 2026</td>
                        <td><span className="dashboard-table-status new">New</span></td>
                      </tr>
                      <tr>
                        <td>Plot in Faizabad Road</td>
                        <td>10 Oct 2026</td>
                        <td><span className="dashboard-table-status interested">Interested</span></td>
                      </tr>
                      <tr>
                        <td>2 BHK Apartment</td>
                        <td>08 Oct 2026</td>
                        <td><span className="dashboard-table-status site-visit">Site Visit</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          </div>
          )
        )}

        {false && activeTab === 'search' && (
          <div className="tab-content-view standalone-search" key="tab-search">
            <SearchCard 
              onSearch={handleSearch} 
              onConnectHelpCenter={() => setShowHelpCenterModal(true)} 
            />
            <CategoryGrid
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
            />
            <PropertySection
              onPropertySelect={handlePropertySelect}
              onWishlistToggle={(count) => setWishlistCount(count + 2)}
            />
          </div>
        )}




      </main>

      {/* Property Details / Quick Enquiry Modal */}
      {selectedProperty && (
        <div
          className="modal-backdrop gpu-accel"
          onClick={handleCloseModal}
        >
          <div
            className="modal-content gpu-accel"
            style={{ padding: '24px 20px 32px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#16A34A', background: '#DCFCE7', padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  🟢 {selectedProperty.tag || 'उपलब्ध'}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>
                  📞 प्लॉट बुकिंग (Call to Book)
                </h3>
              </div>
              <button
                type="button"
                onClick={handleCloseModal}
                style={{ background: '#F3F4F6', border: 'none', width: '30px', height: '30px', borderRadius: '50%', cursor: 'pointer', fontWeight: '700', fontSize: '14px' }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Selected Plot Summary Card */}
            <div style={{ display: 'flex', gap: '12px', background: '#F8FAFC', padding: '14px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '16px' }}>
              <img
                src={selectedProperty.image || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=500&q=80'}
                alt={selectedProperty.title}
                style={{ width: '84px', height: '84px', borderRadius: '12px', objectFit: 'cover', border: '1px solid #E2E8F0' }}
              />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{selectedProperty.title}</div>
                <div style={{ fontSize: '12.5px', color: '#64748B', margin: '3px 0' }}>📍 {selectedProperty.projectName || selectedProperty.location}</div>
                <div style={{ fontSize: '14px', fontWeight: '700', color: '#2563EB' }}>{selectedProperty.price}</div>
                {selectedProperty.totalPrice && (
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#B45309' }}>कुल कीमत: {selectedProperty.totalPrice}</div>
                )}
              </div>
            </div>

            {/* Call Requirement Instructions Box */}
            <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '14px', padding: '12px 14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '13px', fontWeight: '800', color: '#1E40AF', marginBottom: '3px' }}>
                📞 बुकिंग के लिए कॉल आवश्यक है:
              </div>
              <p style={{ fontSize: '12px', color: '#3B82F6', margin: 0, lineHeight: 1.45 }}>
                यह प्लॉट केवल डायरेक्ट कॉल द्वारा ही बुक किया जा सकता है। टोकन व अलॉटमेंट कन्फर्म करने के लिए अभी हमारे अधिकृत रिलेशनशिप मैनेजर को कॉल करें।
              </p>
            </div>

            {/* Action Buttons: 1. Direct Phone Call (Primary) & 2. WhatsApp */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a
                href="tel:+917275004901"
                style={{
                  background: '#16A34A',
                  color: '#FFFFFF',
                  padding: '14px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  textDecoration: 'none',
                  fontWeight: '800',
                  fontSize: '15px',
                  boxShadow: '0 6px 16px rgba(22, 163, 74, 0.35)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>अभी कॉल करके बुक करें (+91 7275004901)</span>
              </a>

              <a
                href={`https://wa.me/917275004901?text=नमस्ते%20Shubharambh%20Realty,%20मुझे%20${encodeURIComponent(selectedProperty.projectName || selectedProperty.location)}%20में%20${encodeURIComponent(selectedProperty.title)}%20(${encodeURIComponent(selectedProperty.price)})%20बुक%20करना%20है।%20कृपया%20बुकिंग%20प्रक्रिया%20बताएं।`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '13px 18px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '14px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"></path>
                </svg>
                <span>WhatsApp पर विवरण भेजें</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Help Center & Sell Support Modal */}
      {showHelpCenterModal && (
        <div
          className="modal-backdrop gpu-accel"
          onClick={() => { setShowHelpCenterModal(false); setHelpCenterSuccess(false); }}
        >
          <div
            className="modal-content gpu-accel"
            style={{ padding: '22px 20px 28px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <div>
                <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--gold-primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>Help Center & Sell Support</span>
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#111827', marginTop: '2px' }}>Sell Property with Trust</h3>
              </div>
              <button
                type="button"
                onClick={() => { setShowHelpCenterModal(false); setHelpCenterSuccess(false); }}
                style={{ background: '#F3F4F6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                ✕
              </button>
            </div>

            <p style={{ fontSize: '12.5px', color: '#6B7280', marginBottom: '18px', lineHeight: '1.4' }}>
              Connect directly with Shubharambh Realty specialists to get free property valuation, verified buyer reach, and zero-brokerage selling assistance.
            </p>

            {/* Quick Action Channels */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '18px' }}>
              <a
                href="https://wa.me/917275004901?text=Hi%20Shubharambh%20Realty,%20I%20want%20to%20sell%20my%20property.%20Please%20connect%20me%20with%20your%20Help%20Center."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '13px',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"></path>
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href="tel:+917275004901"
                style={{
                  background: '#F3F4F6',
                  color: '#111827',
                  border: '1px solid #E5E7EB',
                  padding: '12px 14px',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '13px',
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
                <span>Call Helpline</span>
              </a>
            </div>

            {helpCenterSuccess ? (
              <div style={{ textAlign: 'center', padding: '16px 10px', background: '#F0FDF4', borderRadius: '14px', border: '1px solid #BBF7D0' }}>
                <div style={{ fontSize: '32px', marginBottom: '6px' }}>✅</div>
                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#16A34A', marginBottom: '4px' }}>Callback Request Received!</h4>
                <p style={{ fontSize: '12px', color: '#4B5563' }}>
                  Our property specialist will contact you on +91 7275004901 within 15 minutes.
                </p>
              </div>
            ) : (
              <form onSubmit={(e) => {
                e.preventDefault();
                setHelpCenterSuccess(true);
                setTimeout(() => {
                  setShowHelpCenterModal(false);
                  setHelpCenterSuccess(false);
                }, 2200);
              }}>
                <div style={{ fontSize: '12.5px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>
                  Or Request a Dedicated Specialist Callback:
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', marginBottom: '14px' }}>
                  <input
                    type="text"
                    placeholder="Your Name"
                    defaultValue="Satyam Patel"
                    required
                    style={{ padding: '10.5px 13px', borderRadius: '11px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                  />
                  <input
                    type="tel"
                    placeholder="Mobile Number"
                    defaultValue="+91 7275004901"
                    required
                    style={{ padding: '10.5px 13px', borderRadius: '11px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                  />
                  <input
                    type="text"
                    placeholder="Property Type & Location (e.g. 3 BHK in Gomti Nagar)"
                    defaultValue="Residential Property in Lucknow"
                    required
                    style={{ padding: '10.5px 13px', borderRadius: '11px', border: '1px solid #E5E7EB', fontSize: '13px', outline: 'none' }}
                  />
                </div>
                <button
                  type="submit"
                  className="search-submit-btn"
                  style={{ width: '100%', padding: '12px', fontSize: '14px' }}
                >
                  Connect Me With Help Center
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* 6. Bottom Dock Navigation */}
      <BottomNavbar
        activeTab={activeTab}
        onTabSelect={handleTabSelect}
      />
    </div>
  );
}

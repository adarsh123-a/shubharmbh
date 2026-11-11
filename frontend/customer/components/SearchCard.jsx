import React, { useState } from 'react';

export default function SearchCard({ onSearch, onConnectHelpCenter }) {
  const [activeTab, setActiveTab] = useState('buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Any');
  const [budget, setBudget] = useState('Any');
  const [bedrooms, setBedrooms] = useState('Any');

  const handleTabChange = (tab) => {
    if (tab === 'sell') {
      if (onConnectHelpCenter) {
        onConnectHelpCenter();
      }
    } else {
      setActiveTab('buy');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch({ activeTab, location, propertyType, budget, bedrooms });
    }
  };

  return (
    <div className="search-card-container">
      <div className="floating-search-card gpu-accel">
        {/* Buy / Sell Tabs */}
        <div className="tab-toggle-row">
          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'buy' ? 'active' : ''}`}
            onClick={() => handleTabChange('buy')}
            style={{ cursor: activeTab === 'buy' ? 'default' : 'pointer' }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"></path>
            </svg>
            <span>Buy</span>
          </button>

          <button
            type="button"
            className={`tab-toggle-btn ${activeTab === 'sell' ? 'active' : ''}`}
            onClick={() => handleTabChange('sell')}
            style={{ cursor: activeTab === 'sell' ? 'default' : 'pointer' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.41 11.58l-9-9C12.05 2.22 11.55 2 11 2H4c-1.1 0-2 .9-2 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4 7 4.67 7 5.5 6.33 7 5.5 7z"></path>
            </svg>
            <span>Sell</span>
          </button>
        </div>

        {/* Location Input with Pin & Crosshair Target Icon */}
        <div className="search-input-field">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1F2937" strokeWidth="2.2">
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <input
            type="text"
            className="search-text-input"
            placeholder="Enter location, city or project"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setLocation('Lucknow, Uttar Pradesh')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1F2937', display: 'flex', padding: 0 }}
            title="Use current location"
            aria-label="Current location"
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="22" y1="12" x2="18" y2="12"></line>
              <line x1="6" y1="12" x2="2" y2="12"></line>
              <line x1="12" y1="6" x2="12" y2="2"></line>
              <line x1="12" y1="22" x2="12" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* 3 Dropdown Filters: Property Type, Budget, Bedrooms */}
        <div className="dropdown-grid-3">
          <div className="dropdown-box">
            <span className="dropdown-label">Property Type</span>
            <div className="dropdown-select-wrap">
              <select
                className="dropdown-select"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Villa">Villa</option>
                <option value="Plot">Plot</option>
              </select>
              <svg className="dropdown-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>

          <div className="dropdown-box">
            <span className="dropdown-label">Budget</span>
            <div className="dropdown-select-wrap">
              <select
                className="dropdown-select"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="Under 50L">Under 50L</option>
                <option value="50L - 1Cr">50L - 1Cr</option>
                <option value="Above 1Cr">Above 1Cr</option>
              </select>
              <svg className="dropdown-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>

          <div className="dropdown-box">
            <span className="dropdown-label">Bedrooms</span>
            <div className="dropdown-select-wrap">
              <select
                className="dropdown-select"
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
              >
                <option value="Any">Any</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="4+ BHK">4+ BHK</option>
              </select>
              <svg className="dropdown-chevron" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="m6 9 6 6 6-6"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Big Search Properties CTA */}
        <button type="button" className="search-submit-btn" onClick={handleSearch}>
          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.3-4.3"></path>
          </svg>
          <span>Search Properties</span>
        </button>
      </div>
    </div>
  );
}

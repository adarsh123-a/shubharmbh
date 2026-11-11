import React from 'react';

export default function SearchBar({ searchQuery, onSearchChange, onClear }) {
  return (
    <section className="search-container">
      <div className="search-box gpu-accel">
        <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.3-4.3"></path>
        </svg>
        <input
          type="text"
          className="search-input"
          placeholder="Search by location, project or property..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchQuery && (
          <button className="search-clear-btn" onClick={onClear} aria-label="Clear search">
            ✕
          </button>
        )}
      </div>
    </section>
  );
}

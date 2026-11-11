import React from 'react';

export default function Header({ wishlistCount = 3, onSearchClick, onWishlistClick }) {
  return (
    <header className="app-header gpu-accel">
      <div className="brand-left">
        <img 
          src="./assets/logo.png" 
          alt="Shubharambh Realty" 
          className="brand-logo-img" 
          onError={(e) => { e.currentTarget.src = '../docs/logo.png'; }}
        />
      </div>

      <div className="header-right-actions">
      </div>
    </header>
  );
}

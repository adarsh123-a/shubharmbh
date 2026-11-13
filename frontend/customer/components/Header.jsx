import React from 'react';
import logoImg from '../assets/logo.png';

export default function Header({ wishlistCount = 3, onSearchClick, onWishlistClick }) {
  return (
    <header className="app-header gpu-accel">
      <div className="brand-left">
        <img
          src={logoImg}
          alt="Shubharambh Realty"
          className="brand-logo-img"
          onError={(e) => { e.currentTarget.onerror = null; }}
        />
      </div>

      <div className="header-right-actions">
      </div>
    </header>
  );
}

import React from 'react';

const CATEGORIES = [
  {
    id: 'residential',
    name: 'Residential',
    sub: 'Homes',
    bgColor: '#FEF7DA',
    iconColor: '#B88220',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 3L2 11h3v9a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1v-9h3L12 3zm6-1h-2v2.4l2 1.6V2z"/>
      </svg>
    ),
  },
  {
    id: 'commercial',
    name: 'Commercial',
    sub: 'Office & Shops',
    bgColor: '#FFEEDD',
    iconColor: '#EA580C',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M2 21h20v-2H2v2zm2-4h5V7H4v10zm1-8h1v1H5V9zm0 3h1v1H5v-1zm0 3h1v1H5v-1zm5 4h5V3h-5v14zm1-12h1v1h-1V5zm0 3h1v1h-1V8zm0 3h1v1h-1v-1zm0 3h1v1h-1v-1zm5 4h5V9h-5v8zm1-6h1v1h-1v-1zm0 3h1v1h-1v-1z"/>
      </svg>
    ),
  },
  {
    id: 'plots',
    name: 'Plots',
    sub: 'Land & Plots',
    bgColor: '#DCFCE7',
    iconColor: '#16A34A',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 3L4.5 9.5H7L3.5 15h4v6h3v-6h4L11 9.5h2.5L9 3zm9 7.5L15 15h1.5L14 19h2.5v2h2v-2h2.5l-2.5-4h1.5L18 10.5z"/>
      </svg>
    ),
  },
  {
    id: 'luxury',
    name: 'Luxury',
    sub: 'Villas & Premium',
    bgColor: '#FFE4E6',
    iconColor: '#991B1B',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.5L2 7.5V10h1v10H2v2h20v-2h-1V10h1V7.5L12 2.5zM6 10h2v8H6v-8zm5 0h2v8h-2v-8zm5 0h2v8h-2v-8zm-5-4.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5-1.5-.67-1.5-1.5.67-1.5 1.5-1.5z"/>
      </svg>
    ),
  },
  {
    id: 'investment',
    name: 'Investment',
    sub: 'High Returns',
    bgColor: '#FEF7DA',
    iconColor: '#B45309',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 21h18v-2H3v2zm2-5h3.5v3H5v-3zm5.5-4H14v7h-3.5v-7zm5.5-5H19v12h-3V7z"/>
      </svg>
    ),
  },
];

export default function CategoryGrid({ activeCategory, onSelectCategory }) {
  const handleClick = (catId) => {
    if (activeCategory !== catId) {
      onSelectCategory(catId);
    }
  };

  return (
    <section className="category-section gpu-accel">
      <div className="category-row-5">
        {CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              disabled={isSelected}
              className={`cat-item-col ${isSelected ? 'cat-item-active' : ''}`}
              onClick={() => handleClick(cat.id)}
              style={{
                pointerEvents: isSelected ? 'none' : 'auto',
                cursor: isSelected ? 'default' : 'pointer',
                background: 'none',
                border: 'none',
                padding: 0,
              }}
              aria-disabled={isSelected}
              aria-label={cat.name}
            >
              <div
                className="cat-circle-avatar"
                style={{
                  backgroundColor: cat.bgColor,
                  color: cat.iconColor,
                  border: isSelected ? `2px solid ${cat.iconColor}` : 'none',
                }}
              >
                {cat.icon}
              </div>
              <span className="cat-name-bold">{cat.name}</span>
              <span className="cat-sub-text">{cat.sub}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

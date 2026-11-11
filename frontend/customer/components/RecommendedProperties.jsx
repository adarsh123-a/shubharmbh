import React, { useState } from 'react';

const PROPERTIES = [
  {
    id: 'p1',
    category: 'residential',
    title: '3 BHK Independent House',
    location: 'Ramadevi / Friends Colony, Kanpur Nagar',
    price: '₹ 85 Lakh',
    emi: 'EMI starts ₹ 62,400/mo',
    area: '1600 sq.ft',
    bhk: '3 BHK',
    baths: '3 Bath',
    isVerified: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p2',
    category: 'residential',
    title: '2 BHK Luxury Apartment',
    location: 'Gomti Nagar Extension, Lucknow',
    price: '₹ 65 Lakh',
    emi: 'EMI starts ₹ 47,800/mo',
    area: '1200 sq.ft',
    bhk: '2 BHK',
    baths: '2 Bath',
    isVerified: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p3',
    category: 'luxury',
    title: '4 BHK Grand Signature Villa',
    location: 'Sultanpur Road, Lucknow',
    price: '₹ 1.85 Cr',
    emi: 'EMI starts ₹ 1,35,000/mo',
    area: '3200 sq.ft',
    bhk: '4 BHK',
    baths: '4 Bath',
    isVerified: true,
    isFeatured: true,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'p4',
    category: 'plots',
    title: 'Gated Township Freehold Plot',
    location: 'Faizabad Road, Lucknow',
    price: '₹ 42 Lakh',
    emi: 'Bank Loan Available',
    area: '1800 sq.ft',
    bhk: 'Corner Plot',
    baths: 'East Facing',
    isVerified: true,
    isFeatured: false,
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
  },
];

export default function RecommendedProperties({ activeCategory, searchQuery, onEnquire }) {
  const [favorites, setFavorites] = useState(['p1']);

  const toggleFavorite = (id) => {
    setFavorites((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredProperties = PROPERTIES.filter((prop) => {
    const matchesCategory = activeCategory === 'all' || prop.category === activeCategory;
    const matchesSearch = 
      prop.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prop.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="properties-container">
      <div className="section-header">
        <h2 className="section-title">Recommended For You</h2>
        <span className="section-action">{filteredProperties.length} Properties</span>
      </div>

      <div className="properties-list">
        {filteredProperties.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 10px', color: 'var(--text-muted)' }}>
            No properties found matching your criteria.
          </div>
        ) : (
          filteredProperties.map((prop) => {
            const isFav = favorites.includes(prop.id);
            return (
              <article key={prop.id} className="property-card gpu-accel">
                <div className="property-image-box">
                  <img 
                    src={prop.image} 
                    alt={prop.title} 
                    className="property-img" 
                    loading="lazy"
                  />
                  
                  <div className="badge-tag-wrap">
                    {prop.isVerified && (
                      <span className="property-tag tag-verified">✓ Verified</span>
                    )}
                    {prop.isFeatured && (
                      <span className="property-tag tag-featured">★ Featured</span>
                    )}
                  </div>

                  <button
                    className={`wishlist-btn ${isFav ? 'favorited heart-animated' : ''}`}
                    onClick={() => toggleFavorite(prop.id)}
                    aria-label="Save to wishlist"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                    </svg>
                  </button>
                </div>

                <div className="property-info">
                  <div className="prop-price-row">
                    <span className="prop-price">{prop.price}</span>
                    <span className="prop-emi">{prop.emi}</span>
                  </div>

                  <h3 className="prop-title">{prop.title}</h3>
                  
                  <div className="prop-location">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>{prop.location}</span>
                  </div>

                  <div className="prop-amenities-row">
                    <span className="prop-spec">📐 {prop.area}</span>
                    <span className="prop-spec">🛏️ {prop.bhk}</span>
                    <span className="prop-spec">🚿 {prop.baths}</span>
                  </div>

                  <div className="prop-footer-actions">
                    <button 
                      className="enquire-action-btn"
                      onClick={() => onEnquire(prop)}
                    >
                      <span>Quick Enquiry</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                      </svg>
                    </button>

                    <a 
                      href={`https://wa.me/917275004901?text=Hi%20Shubharambh%20Realty,%20I%20am%20interested%20in%20${encodeURIComponent(prop.title)}%20(${encodeURIComponent(prop.price)})`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="whatsapp-action-btn"
                      title="Direct WhatsApp Chat"
                      aria-label="Chat on WhatsApp"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.5c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.11-.23-.17-.48-.3"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

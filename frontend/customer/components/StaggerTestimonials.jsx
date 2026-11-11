import React, { useState, useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';

/**
 * 📸 STAGGER IMAGES GALLERY
 * View options:
 * - 'normal': Fanned out staggered cards with chamfered active center card
 * - 'grid': 2-Column Square (1-1, 1-1) Phone Gallery layout with Lightbox Modal
 */
// Dynamically scan customer/assets/pic and all its subfolders for images
const picModules = import.meta.glob([
  '../assets/pic/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
  '../assets/pic/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,SVG}',
], { eager: true, import: 'default' });

const SCANNED_IMAGES = Object.entries(picModules).map(([path, src], index) => {
  const fileName = path.split('/').pop().replace(/\.[^/.]+$/, '');
  return {
    id: `gallery-pic-${index + 1}`,
    src,
    alt: fileName || `Project Photo ${index + 1}`,
  };
});

const FALLBACK_IMAGES = [
  {
    id: 'gallery-1',
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80',
    alt: 'Modern Villa Estate',
  },
  {
    id: 'gallery-2',
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=720&q=80',
    alt: 'Luxury Residence Architecture',
  },
];

const DEFAULT_IMAGES = SCANNED_IMAGES.length > 0 ? SCANNED_IMAGES : FALLBACK_IMAGES;

function shuffleArray(list) {
  const arr = [...list];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function StaggerTestimonials({ images = DEFAULT_IMAGES }) {
  const [galleryImages] = useState(() => shuffleArray(images));
  const [viewMode, setViewMode] = useState('normal'); // 'normal' | 'grid'
  const [activeIndex, setActiveIndex] = useState(() => (
    images.length > 0 ? Math.floor(Math.random() * images.length) : 0
  ));
  const [previewImage, setPreviewImage] = useState(null); // Lightbox preview object/index
  const total = galleryImages.length;

  useEffect(() => {
    if (previewImage) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [previewImage]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  const handleCardClick = (index) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  const openLightbox = (item, idx) => {
    setPreviewImage({ item, idx });
  };

  const closeLightbox = () => {
    setPreviewImage(null);
  };

  return (
    <section className="stagger-testimonials-section gpu-accel" aria-label="Project Photo Gallery">
      <div className="stagger-testimonials-container">
        {/* 🎛️ Top View Switcher (Normal View vs 2-Column Gallery Grid View) */}
        <div className="stagger-top-bar">
          <div className="stagger-header-meta">
            <span className="stagger-eyebrow">📸 Project Gallery</span>
          </div>

          <div className="stagger-view-switcher" role="tablist" aria-label="Gallery View Mode">
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'normal'}
              className={`stagger-toggle-btn ${viewMode === 'normal' ? 'active' : ''}`}
              onClick={() => setViewMode('normal')}
            >
              <span className="toggle-icon">🎴</span>
              <span>Normal View</span>
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={viewMode === 'grid'}
              className={`stagger-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <span className="toggle-icon">▦</span>
              <span>Grid View (1-1)</span>
            </button>
          </div>
        </div>

        {/* MODE 1: Normal View (101% Carbon-Copy Fanned Stagger Cards) */}
        {viewMode === 'normal' && (
          <>
            <div className="stagger-cards-stage">
              {galleryImages.map((item, idx) => {
                const imgSrc = typeof item === 'string' ? item : item.src;
                const imgAlt = typeof item === 'string' ? `Project photo ${idx + 1}` : (item.alt || `Photo ${idx + 1}`);

                let offset = idx - activeIndex;
                if (offset > total / 2) offset -= total;
                if (offset < -total / 2) offset += total;

                const isActive = offset === 0;
                const isVisible = Math.abs(offset) <= 3;

                if (!isVisible) return null;

                const rotAngles = {
                  '-3': -11,
                  '-2': -7.5,
                  '-1': -4.5,
                  '0': 0,
                  '1': 4.5,
                  '2': 7.5,
                  '3': 11,
                };

                const xTranslations = {
                  '-3': -370,
                  '-2': -250,
                  '-1': -130,
                  '0': 0,
                  '1': 130,
                  '2': 250,
                  '3': 370,
                };

                const zIndices = {
                  '-3': 2,
                  '-2': 4,
                  '-1': 6,
                  '0': 10,
                  '1': 6,
                  '2': 4,
                  '3': 2,
                };

                const rot = rotAngles[offset] || 0;
                const tx = xTranslations[offset] || 0;
                const zIndex = zIndices[offset] || 1;

                return (
                  <article
                    key={item.id || idx}
                    className={`stagger-card ${isActive ? 'stagger-card-active' : 'stagger-card-side'}`}
                    style={{
                      transform: `translate3d(calc(-50% + ${tx}px), 0, 0) rotate(${rot}deg)`,
                      zIndex,
                    }}
                    onClick={() => handleCardClick(idx)}
                    aria-current={isActive ? 'true' : 'false'}
                  >
                    <img
                      src={imgSrc}
                      alt={imgAlt}
                      className="stagger-card-cover-img"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80';
                      }}
                    />
                  </article>
                );
              })}
            </div>

            {/* Minimal Navigation Arrows */}
            <div className="stagger-nav-controls">
              <button
                type="button"
                className="stagger-arrow-btn"
                onClick={handlePrev}
                aria-label="Previous image"
              >
                ←
              </button>
              <button
                type="button"
                className="stagger-arrow-btn"
                onClick={handleNext}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </>
        )}

        {/* MODE 2: 2-Column Square Gallery Grid (1 - 1, 1 - 1) */}
        {viewMode === 'grid' && (
          <div className="stagger-images-grid" role="region" aria-label="Square Photo Gallery Grid (1-1)">
            {galleryImages.map((item, idx) => {
              const imgSrc = typeof item === 'string' ? item : item.src;
              const imgAlt = typeof item === 'string' ? `Project photo ${idx + 1}` : (item.alt || `Photo ${idx + 1}`);

              return (
                <div
                  key={item.id || idx}
                  className="stagger-grid-item"
                  onClick={() => openLightbox(item, idx)}
                  title="Click to view full photo"
                >
                  <img
                    src={imgSrc}
                    alt={imgAlt}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=720&q=80';
                    }}
                  />
                  <div className="stagger-grid-overlay">
                    <span className="stagger-grid-action">View Full Photo 🔍</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 🖼️ Full-screen Lightbox Preview Modal (Portal to document.body) */}
        {previewImage && typeof document !== 'undefined' && createPortal(
          <div className="stagger-lightbox-overlay" onClick={closeLightbox}>
            <div className="stagger-lightbox-box" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="stagger-lightbox-close"
                onClick={closeLightbox}
                aria-label="Close photo preview"
              >
                ✕
              </button>
              <img
                src={typeof previewImage.item === 'string' ? previewImage.item : previewImage.item.src}
                alt="Full preview"
                className="stagger-lightbox-img"
              />
              <div className="stagger-lightbox-meta">
                <span>Photo {previewImage.idx + 1} of {total}</span>
                <button
                  type="button"
                  className="stagger-lightbox-btn"
                  onClick={() => {
                    setActiveIndex(previewImage.idx);
                    setViewMode('normal');
                    closeLightbox();
                  }}
                >
                  Open in Stagger View 🎴
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
}

import React, { useState, useEffect, useRef } from 'react';

const SLIDE_IMAGES = [
  {
    id: 0,
    image: './assets/hero-slide-1.jpg',
    alt: 'Luxury Twilight Villa with Pool & Evening Lighting',
  },
  {
    id: 1,
    image: './assets/hero-slide-2.jpg',
    alt: 'Ultra-Modern High-Rise Condominium at Sunset',
  },
  {
    id: 2,
    image: './assets/hero-slide-3.jpg',
    alt: 'Contemporary Luxury Mansion Estate at Night',
  },
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const autoSlideTimer = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentSlide]);

  const startAutoSlide = () => {
    stopAutoSlide();
    autoSlideTimer.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
    }, 4500);
  };

  const stopAutoSlide = () => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
  };

  const handleTouchStart = (e) => {
    stopAutoSlide();
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (touchEndX.current !== 0) {
      if (diff > 50) {
        setCurrentSlide((prev) => (prev + 1) % SLIDE_IMAGES.length);
      } else if (diff < -50) {
        setCurrentSlide((prev) => (prev - 1 + SLIDE_IMAGES.length) % SLIDE_IMAGES.length);
      }
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
    startAutoSlide();
  };

  return (
    <div
      className="hero-wrapper gpu-accel"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseEnter={stopAutoSlide}
      onMouseLeave={startAutoSlide}
    >
      {/* 3 Sliding Background Images */}
      {SLIDE_IMAGES.map((slide, index) => {
        const isActive = currentSlide === index;
        return (
          <div
            key={slide.id}
            className={`hero-slide-layer ${isActive ? 'active' : ''}`}
            style={{
              opacity: isActive ? 1 : 0,
              transform: isActive ? 'scale(1) translate3d(0, 0, 0)' : 'scale(1.04) translate3d(0, 0, 0)',
              transition: 'opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="hero-bg-img"
              draggable={false}
              loading={index === 0 ? 'eager' : 'lazy'}
            />
          </div>
        );
      })}

      <div className="hero-overlay-gradient"></div>

      {/* 101% Exact Static Typography Matching Reference Image */}
      <div className="hero-text-content">
        <div className="hero-tag">Find Your</div>
        <div className="hero-title-dream">Dream</div>
        <div className="hero-title-property">Property</div>
        <div className="hero-subtitle">
          Buy, Sell & Invest in<br />
          Properties with Trust
        </div>
      </div>

      {/* 3 Carousel Indicator Dots Matching Reference Image */}
      <div className="hero-dots-indicator">
        {SLIDE_IMAGES.map((slide, index) => (
          <span
            key={slide.id}
            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></span>
        ))}
      </div>
    </div>
  );
}

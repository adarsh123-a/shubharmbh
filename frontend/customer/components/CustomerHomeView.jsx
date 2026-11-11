import React from 'react';
import HeroBanner from './HeroBanner.jsx';
import OfferTicker from './OfferTicker.jsx';
import PropertySection from './PropertySection.jsx';
import ProjectLocationMap from './ProjectLocationMap.jsx';
import StaggerTestimonials from './StaggerTestimonials.jsx';

export default function CustomerHomeView({
  selectedProject,
  onSelectProject,
  onPropertySelect,
}) {
  return (
    <div className="tab-content-view" key="tab-home">
      {/* 1. Hero Banner: Luxury Villa + Dream Property Typography */}
      <HeroBanner />

      {/* 2. Moving Reviews & Customer Testimonials Ticker */}
      <OfferTicker />

      {/* 3. Plot / Project Selector Section */}
      <PropertySection
        selectedProject={selectedProject}
        onSelectProject={onSelectProject}
        onPropertySelect={onPropertySelect}
      />

      {/* 4. Google Maps & Location Section */}
      <ProjectLocationMap
        selectedProject={selectedProject}
      />

      {/* 5. Staggered Customer Testimonials & Dynamic Project Gallery */}
      <StaggerTestimonials />
    </div>
  );
}

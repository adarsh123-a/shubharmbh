import React, { useState, useEffect, useMemo } from 'react';

export default function ProjectLocationMap({ selectedProject }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const handleData = (json) => {
      if (json && json.status && Array.isArray(json.data) && json.data.length > 0) {
        setProjects(json.data);
      }
    };

    if (window.__HOME_API_DATA__) {
      handleData(window.__HOME_API_DATA__);
    } else if (window.__HOME_API_PROMISE__) {
      window.__HOME_API_PROMISE__.then(handleData).catch(() => {});
    } else {
      fetch('/eformx-api/?api=property/v1/home/home')
        .then((res) => res.json())
        .then(handleData)
        .catch((err) => console.error('Map location fetch error:', err));
    }

    const onLoaded = (e) => {
      if (e.detail && e.detail.status) {
        handleData(e.detail);
      }
    };
    window.addEventListener('homeApiLoaded', onLoaded);
    return () => window.removeEventListener('homeApiLoaded', onLoaded);
  }, []);

  // Find strictly the matching project for selectedProject
  const activeProject = useMemo(() => {
    if (!selectedProject || !projects.length) return null;
    return projects.find((p) => p.side_name === selectedProject) || null;
  }, [selectedProject, projects]);

  const lat = activeProject?.lat || '26.4095280';
  const lng = activeProject?.lng || '80.3894150';
  const siteName = activeProject?.side_name || selectedProject;

  const mapEmbedUrl = `https://maps.google.com/maps?q=${lat},${lng}&hl=hi&z=16&output=embed`;
  const mapDirectUrl = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

  return (
    <section className="map-location-section gpu-accel" aria-label="Project Map & Connectivity">
      <div className="map-location-card">
        {/* Header */}
        <div className="map-header-row">
          <div>
            <span className="map-tag-pill">📍 प्राइम लोकेशन</span>
            <h3 className="map-main-heading">प्रोजेक्ट लोकेशन & कनेक्टिविटी</h3>
          </div>
          <span className="map-live-badge">VERIFIED GPS</span>
        </div>

        {/* 🔒 State 1: Jab tak koi project select na ho, Map hide rahega aur overlay aayega */}
        {!selectedProject && (
          <div className="select-project-overlay-card" style={{ padding: '36px 16px', margin: '8px 0' }}>
            <div className="select-project-overlay-icon">📍</div>
            <h3 className="select-project-overlay-title">प्रोजेक्ट लोकेशन मैप</h3>
            <p className="select-project-overlay-desc">
              गूगल मैप लोकेशन व कनेक्टिविटी देखने के लिए ऊपर 'प्रोजेक्ट चुनें' ड्रॉपडाउन से प्रोजेक्ट चुनें।
            </p>
          </div>
        )}

        {/* 🔓 State 2: Jab project select ho jaye tab Strictly usi project ka Map display hoga */}
        {selectedProject && activeProject && (
          <>
            {/* Embedded Google Map with Selected Site's Live Lat & Lng */}
            <div className="map-embed-wrapper">
              <iframe
                key={`${lat}-${lng}-${siteName}`}
                title={`Shubharambh Realty - ${siteName}`}
                src={mapEmbedUrl}
                width="100%"
                height="220"
                style={{ border: 0, borderRadius: '14px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="map-pin-overlay-chip">
                <span className="pin-indicator"></span>
                <span>{siteName} • GPS: {lat}, {lng}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="map-actions-row">
              <a
                href={mapDirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="map-direction-btn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <polygon points="3 11 22 2 13 21 11 13 3 11"></polygon>
                </svg>
                <span>Google Maps पर देखें</span>
              </a>

              <a
                href={`https://wa.me/917275004901?text=Hi%20Shubharambh%20Realty,%20I%20want%20to%20book%20a%20free%20site%20visit%20cab%20for%20${encodeURIComponent(siteName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="map-cab-btn"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3">
                  <rect x="1" y="3" width="15" height="13"></rect>
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                  <circle cx="5.5" cy="18.5" r="2.5"></circle>
                  <circle cx="18.5" cy="18.5" r="2.5"></circle>
                </svg>
                <span>फ्री कैब विजिट बुक करें</span>
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

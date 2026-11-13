import React, { useState, useEffect, useMemo, useCallback } from 'react';

export default function PropertySection({
  selectedProject: propSelectedProject,
  onSelectProject,
  onPropertySelect,
}) {
  const [apiProjects, setApiProjects] = useState([]);
  const [internalSelectedProject, setInternalSelectedProject] = useState('');
  const selectedProject = propSelectedProject !== undefined ? propSelectedProject : internalSelectedProject;

  const [isLoading, setIsLoading] = useState(true);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleProjectChange = (val) => {
    setInternalSelectedProject(val);
    if (onSelectProject) onSelectProject(val);
  };

  // Fetch API function with retry (supports forceFresh for live data)
  const fetchPropertyData = useCallback((forceFresh = false) => {
    setIsLoading(true);
    setShowErrorPopup(false);

    const handleSuccess = (json) => {
      setIsLoading(false);
      if (json && json.status && Array.isArray(json.data) && json.data.length > 0) {
        setApiProjects(json.data);
      } else {
        setErrorMessage(json?.message || 'सर्वर से कोई प्रोजेक्ट डेटा प्राप्त नहीं हुआ।');
        setShowErrorPopup(true);
      }
    };

    const handleError = (err) => {
      setIsLoading(false);
      setErrorMessage(err?.message || 'नेटवर्क समस्या: सर्वर से कनेक्ट नहीं हो सका।');
      setShowErrorPopup(true);
    };

    // If forceFresh requested, bypass cache and fetch directly
    if (forceFresh) {
      window.__HOME_API_DATA__ = null;
      fetch(`/eformx-api/?api=property/v1/home/home&_t=${Date.now()}`, { cache: 'no-store' })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
          return res.json();
        })
        .then((json) => {
          window.__HOME_API_DATA__ = json;
          handleSuccess(json);
        })
        .catch(handleError);
      return;
    }

    // Check pre-fetched data from index.html first
    if (window.__HOME_API_DATA__) {
      handleSuccess(window.__HOME_API_DATA__);
    } else if (window.__HOME_API_PROMISE__) {
      window.__HOME_API_PROMISE__.then(handleSuccess).catch(handleError);
    } else {
      fetch(`/eformx-api/?api=property/v1/home/home&_t=${Date.now()}`, { cache: 'no-store' })
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
          return res.json();
        })
        .then(handleSuccess)
        .catch(handleError);
    }
  }, []);

  useEffect(() => {
    fetchPropertyData();

    const onLoaded = (e) => {
      if (e.detail && e.detail.status) {
        setApiProjects(e.detail.data || []);
        setIsLoading(false);
      }
    };
    window.addEventListener('homeApiLoaded', onLoaded);
    return () => window.removeEventListener('homeApiLoaded', onLoaded);
  }, [fetchPropertyData]);

  // Compute active plots list strictly for selected project
  const currentPlots = useMemo(() => {
    if (!selectedProject || !apiProjects.length) return [];

    const targetProject = apiProjects.find((p) => p.side_name === selectedProject);
    if (!targetProject || !Array.isArray(targetProject.plots)) return [];

    return targetProject.plots.map((p) => {
      const areaNum = parseFloat(p.area) || 0;
      const priceNum = parseFloat(p.price) || 0;
      const unitRate = areaNum > 0 ? Math.round(priceNum / areaNum) : 0;
      const unit = p.land_unit || 'गज';

      let statusText = 'उपलब्ध';
      let statusClass = 'available';
      if (p.status === 'booked') {
        statusText = 'बुक';
        statusClass = 'booked';
      } else if (p.status === 'sold') {
        statusText = 'बिक चुका';
        statusClass = 'sold';
      }

      return {
        id: p.id || p.plot_id,
        name: p.plot_id ? p.plot_id.replace(/^L\d+-/, '') : `PLOT-${p.id}`,
        fullPlotId: p.plot_id,
        projectName: targetProject.side_name,
        sizeRate: `${Math.round(areaNum)} ${unit} · ₹${unitRate.toLocaleString('en-IN')}/${unit}`,
        totalPrice: `₹${Math.round(priceNum).toLocaleString('en-IN')}`,
        status: statusClass,
        statusText,
        image: targetProject.img || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
      };
    });
  }, [apiProjects, selectedProject]);

  const handleUnitClick = (unit) => {
    // केवल उपलब्ध (available) प्लॉट पर ही बुकिंग डायलॉग खुलेगा
    if (unit.status !== 'available') {
      alert(`यह प्लॉट (${unit.name}) पहले से '${unit.statusText}' है। केवल 'उपलब्ध' प्लॉट ही बुक किए जा सकते हैं।`);
      return;
    }

    if (onPropertySelect) {
      onPropertySelect({
        id: unit.id,
        title: `Plot ${unit.name}`,
        fullPlotId: unit.fullPlotId,
        projectName: unit.projectName || selectedProject,
        location: unit.projectName || selectedProject,
        price: unit.sizeRate,
        totalPrice: unit.totalPrice,
        area: unit.sizeRate.split('·')[0].trim(),
        tag: unit.statusText,
        image: unit.image,
      });
    }
  };

  return (
    <section className="plot-selector-section gpu-accel" aria-label="Project and Plot Selector">
      <div className="plot-selector-card">
        {/* Header: Title + Dynamic Project Dropdown */}
        <div className="plot-header-row">
          <h2 className="plot-main-title">प्रोजेक्ट चुनें</h2>
          <div className="project-dropdown-wrap">
            <select
              value={selectedProject}
              onChange={(e) => handleProjectChange(e.target.value)}
              className="project-select-input"
              aria-label="Select Project"
              disabled={isLoading || apiProjects.length === 0}
            >
              <option value="">-- प्रोजेक्ट चुनें --</option>
              {apiProjects.map((proj) => (
                <option key={proj.land || proj.side_name} value={proj.side_name}>
                  {proj.side_name}
                </option>
              ))}
            </select>
            <svg
              className="project-chevron-icon"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        {/* Loading Spinner */}
        {isLoading && (
          <div className="api-loading-state" style={{ padding: '36px 16px', textAlign: 'center' }}>
            <div className="api-spinner"></div>
            <p style={{ marginTop: '12px', fontSize: '13px', fontWeight: 600, color: '#475569' }}>
              लाइव प्रोजेक्ट्स लोड हो रहे हैं...
            </p>
          </div>
        )}

        {/* 🔒 State 1: Jab tak user project select na kare tab tak Overlay dikhega */}
        {!isLoading && !selectedProject && (
          <div className="select-project-overlay-card">
            <div className="select-project-overlay-icon">🏗️</div>
            <h3 className="select-project-overlay-title">कृपया प्रोजेक्ट चुनें</h3>
            <p className="select-project-overlay-desc">
              उपलब्ध प्लॉट्स, नक्शा व कीमतें देखने के लिए ऊपर दिए गए ड्रॉपडाउन से प्रोजेक्ट चुनें।
            </p>
          </div>
        )}

        {/* 🔓 State 2: Jab project select ho jaye tab Legend aur Plots Grid dikhega */}
        {!isLoading && selectedProject && (
          <>
            {/* Legend Row */}
            <div className="plot-legend-row">
              <div className="plot-legend-item">
                <span className="legend-dot available"></span>
                <span className="legend-text">उपलब्ध</span>
              </div>
              <div className="plot-legend-item">
                <span className="legend-dot booked"></span>
                <span className="legend-text">बुक</span>
              </div>
              <div className="plot-legend-item">
                <span className="legend-dot sold"></span>
                <span className="legend-text">बिक चुका</span>
              </div>
            </div>

            {/* 3-Column Plots Grid from Live API */}
            {currentPlots.length > 0 ? (
              <div className="plot-cards-grid">
                {currentPlots.map((unit) => {
                  const isAvail = unit.status === 'available';
                  return (
                    <div
                      key={unit.id}
                      className={`plot-unit-card ${unit.status}`}
                      onClick={() => handleUnitClick(unit)}
                      role="button"
                      tabIndex={0}
                      style={{
                        cursor: isAvail ? 'pointer' : 'not-allowed',
                        opacity: isAvail ? 1 : 0.78,
                      }}
                      title={isAvail ? 'क्लिक करके कॉल से बुक करें' : `यह प्लॉट पहले से '${unit.statusText}' है`}
                    >
                      <div className="plot-unit-id">{unit.name}</div>
                      <div className="plot-unit-rate">{unit.sizeRate}</div>
                      <div className="plot-unit-status">{unit.statusText}</div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ padding: '32px 16px', textAlign: 'center', color: '#64748B' }}>
                <p style={{ fontSize: '14px', fontWeight: 600 }}>इस प्रोजेक्ट में अभी कोई प्लॉट उपलब्ध नहीं है।</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* ⚠️ API Error Popup Modal */}
      {showErrorPopup && (
        <div className="api-error-modal-overlay" onClick={() => setShowErrorPopup(false)}>
          <div className="api-error-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="api-error-icon-circle">⚠️</div>
            <h3 className="api-error-title">डेटा लोड नहीं हो सका</h3>
            <p className="api-error-desc">
              {errorMessage || 'सर्वर से कनेक्ट करने में समस्या आ रही है। कृपया अपना इंटरनेट कनेक्शन चेक करें।'}
            </p>
            <div className="api-error-actions">
              <button
                type="button"
                className="api-retry-btn"
                onClick={() => fetchPropertyData(true)}
              >
                पुनः प्रयास करें (Retry)
              </button>
              <button
                type="button"
                className="api-close-btn"
                onClick={() => setShowErrorPopup(false)}
              >
                बंद करें
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

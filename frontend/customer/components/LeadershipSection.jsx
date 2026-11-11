import React, { useState } from 'react';

const LEADERS = [
  {
    id: 'founder',
    name: 'Satyam Patel',
    role: 'Founder & Managing Director',
    badge: '🏆 Founder',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&h=240&q=80',
    initials: 'SP',
    avatarBg: '#FEF3C7',
    avatarColor: '#B45309',
    desc: 'Bringing 10+ years of real estate experience, with a commitment to transparent deals, clear titles, and timely property registration.',
  },
];

export default function LeadershipSection() {
  const [photoFailed, setPhotoFailed] = useState(false);

  return (
    <section className="leadership-section gpu-accel">
      <div className="leadership-container-card">
        {/* Header */}
        <div className="leadership-header-block">
          <span className="leadership-tag-pill">👑 Founder & Leadership</span>
          <h3 className="leadership-main-title">Meet Our Founder</h3>
          <p className="leadership-sub-text">
            Building trust through legal clarity and transparent property transactions.
          </p>
        </div>

        <div className="leaders-cards-list">
          {LEADERS.map((leader) => (
            <div key={leader.id} className="leader-profile-card" aria-label={leader.name}>
              <div className="leader-profile-top">
                <div
                  className="leader-avatar-circle"
                  style={{ backgroundColor: leader.avatarBg, color: leader.avatarColor }}
                >
                  {photoFailed ? (
                    leader.initials
                  ) : (
                    <img
                      src={leader.image}
                      alt="Illustrative stock portrait; not a real photo of Satyam Patel"
                      onError={() => setPhotoFailed(true)}
                    />
                  )}
                </div>

                <div className="leader-info-meta">
                  <div className="leader-badge-row">
                    <span className="leader-role-badge">{leader.badge}</span>
                  </div>
                  <h4 className="leader-name-heading">{leader.name}</h4>
                  <div className="leader-designation-text">{leader.role}</div>
                  <span className="leader-photo-note">Illustrative photo</span>
                </div>
              </div>

              <p className="leader-bio-desc">{leader.desc}</p>
              <div className="leader-socials">
                <span className="leader-socials-label">Connect with us</span>
                <div className="leader-socials-list" aria-label="Social media demo links">
                  <button type="button" className="leader-social-link youtube" disabled aria-label="YouTube demo link">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z" />
                    </svg>
                  </button>
                  <button type="button" className="leader-social-link whatsapp" disabled aria-label="WhatsApp demo link">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.5 3.5A11.8 11.8 0 0 0 12.1 0C5.6 0 .3 5.3.3 11.8c0 2.1.5 4.1 1.6 5.9L0 24l6.5-1.7a11.8 11.8 0 0 0 5.6 1.4h.1c6.5 0 11.8-5.3 11.8-11.8 0-3.2-1.2-6.1-3.5-8.4ZM12.1 21.7c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.9 1 1-3.8-.3-.4a9.8 9.8 0 0 1-1.5-5.2c0-5.5 4.5-10 10-10 2.7 0 5.2 1.1 7.1 2.9a9.9 9.9 0 0 1 2.9 7.1c0 5.5-4.5 10-9.9 10Zm5.5-7.5c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.1-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.1-.7-1.6-.9-2.1-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.1 3c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.3.2-.7.2-1.2.2-1.3s-.3-.3-.6-.4Z" />
                    </svg>
                  </button>
                  <button type="button" className="leader-social-link instagram" disabled aria-label="Instagram demo link">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 2.3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm5.7-3.3a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z" />
                    </svg>
                  </button>
                </div>
              </div>
              <button type="button" className="join-channel-btn" disabled>
                <span className="join-channel-icon" aria-hidden="true">▶</span>
                <span className="join-channel-copy">
                  <strong>Join our channel</strong>
                  <small>Property updates, new launches & insights</small>
                </span>
                <span className="join-channel-arrow" aria-hidden="true">→</span>
              </button>
              <span className="join-channel-demo-note">Demo preview · Channel link coming soon</span>
            </div>
          ))}
        </div>

        {/* Trust Badges Footer */}
        <div className="leadership-trust-footer">
          <div className="trust-pill-item">
            <span className="trust-pill-num">1000+</span>
            <span className="trust-pill-label">Happy Families</span>
          </div>
          <div className="trust-pill-item">
            <span className="trust-pill-num">100%</span>
            <span className="trust-pill-label">Legal Registration</span>
          </div>
          <div className="trust-pill-item">
            <span className="trust-pill-num">0%</span>
            <span className="trust-pill-label">Hidden Charges</span>
          </div>
        </div>
      </div>
    </section>
  );
}

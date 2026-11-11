import React from 'react';

export default function CustomerMyPropertiesView({ properties = [], onNavigateTab = () => { } }) {
  return (
    <div className="tab-content-view customer-my-properties-view" style={{ padding: '16px 16px 85px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: '800', color: '#B45309', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Portfolio
          </span>
          <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '2px 0 0' }}>
            My Listed Properties
          </h2>
        </div>
        <button
          type="button"
          onClick={() => onNavigateTab('post')}
          style={{
            background: '#0F172A',
            color: '#FFFFFF',
            border: 'none',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '12px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          + Post New
        </button>
      </div>

      {properties.length === 0 ? (
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: '18px',
            padding: '36px 20px',
            textAlign: 'center',
            border: '1px solid #E2E8F0',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: '8px' }}>🏡</div>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px' }}>
            No Listed Properties Yet
          </h3>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px' }}>
            Aapne abhi tak koi property list nahi ki hai. Abhi apni property list karein aur verified buyers se connect karein.
          </p>
          <button
            type="button"
            onClick={() => onNavigateTab('post')}
            style={{
              background: '#16A34A',
              color: '#FFFFFF',
              border: 'none',
              padding: '11px 18px',
              borderRadius: '12px',
              fontSize: '13px',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            List Property Now
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {properties.map((prop) => (
            <div
              key={prop.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '14px',
                boxShadow: '0 2px 8px rgba(15, 23, 42, 0.04)',
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
              }}
            >
              <img
                src={prop.img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=200&q=80'}
                alt={prop.title}
                style={{
                  width: '74px',
                  height: '74px',
                  borderRadius: '12px',
                  objectFit: 'cover',
                  border: '1px solid #E2E8F0',
                  flexShrink: 0,
                }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '6px' }}>
                  <h4 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {prop.title}
                  </h4>
                  <span
                    style={{
                      fontSize: '10px',
                      fontWeight: '700',
                      background: prop.statusBg || '#DCFCE7',
                      color: prop.statusColor || '#16A34A',
                      padding: '2px 7px',
                      borderRadius: '6px',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {prop.status}
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '3px' }}>
                  📍 {prop.location}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                  <strong style={{ fontSize: '13.5px', color: '#2563EB', fontWeight: '800' }}>
                    {prop.price}
                  </strong>
                  <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>
                    👥 {prop.leads || 0} Inquiries
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


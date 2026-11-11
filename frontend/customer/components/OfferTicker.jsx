import React from 'react';

const ITEMS = [
  {
    name: 'रमेश कुमार पटेल',
    location: 'गोमती नगर, लखनऊ',
    rating: 5,
    text: '‘शुभारंभ एन्क्लेव में प्लॉट A-03 का पजेशन मात्र 15 दिन में मिल गया। 100% क्लियर रजिस्ट्री!’',
    verified: 'वेरिफाइड खरीदार',
  },
  {
    name: 'डॉ. सुनीता वर्मा',
    location: 'कानपुर रोड, लखनऊ',
    rating: 5,
    text: '‘पारदर्शी काम और पूरी साइट पर चौड़ी सड़कें व बिजली। बेस्ट इन्वेस्टमेंट फैसला!’',
    verified: 'वेरिफाइड खरीदार',
  },
  {
    name: 'अमित कुमार सिंह',
    location: 'हजरतगंज, लखनऊ',
    rating: 5,
    text: '‘शुभारंभ टीम ने बिना किसी ब्रोकरेज के सब पेपरवर्क खुद पूरा कराया। बहुत भरोसेमंद!’',
    verified: 'वेरिफाइड खरीदार',
  },
  {
    name: 'राजेश त्रिपाठी',
    location: 'अयोध्या रोड, लखनऊ',
    rating: 5,
    text: '‘समय पर डिलीवरी और तुरंत दाखिल-खारिज। पूरी टीम का व्यवहार बहुत सहयोगी रहा।’',
    verified: 'वेरिफाइड खरीदार',
  },
  {
    name: 'प्रियंका मौर्या',
    location: 'सुल्तानपुर रोड, लखनऊ',
    rating: 5,
    text: '‘प्राइम लोकेशन पर बजट फ्रेंडली प्लॉट मिला। शानदार डेवलपमेंट और कनेक्टिविटी!’',
    verified: 'वेरिफाइड खरीदार',
  },
];

export default function OfferTicker() {
  const tickerItems = [...ITEMS, ...ITEMS];

  return (
    <section className="offer-testimonials-section gpu-accel">
      <div className="offer-ticker-header">
        <div className="offer-ticker-title-wrap">
          <span className="live-pulse-dot"></span>
          <span className="offer-ticker-title">ग्राहक फीडबैक & समीक्षा</span>
        </div>
        <span className="offer-live-tag">FEEDBACK</span>
      </div>

      <div className="offer-ticker-viewport">
        <div className="offer-ticker-track">
          {tickerItems.map((item, index) => (
            <div key={`item-${index}`} className="ticker-card testimonial-card">
              <div className="ticker-card-top">
                <div className="testimonial-rating">
                  {'★'.repeat(item.rating)}
                </div>
                <span className="verified-badge-chip">✓ {item.verified}</span>
              </div>
              <p className="testimonial-quote">{item.text}</p>
              <div className="testimonial-author">
                <span className="author-name">{item.name}</span>
                <span className="author-dot">•</span>
                <span className="author-loc">{item.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

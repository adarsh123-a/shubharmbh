# Customer — Functional & Portal Requirements

## 1. Role Scope & Authority
Customers (property buyers, tenants, and investors) browse property listings, filter by categories, submit project inquiries, and track active bookings.

## 2. Key Screen Components (from Reference Design)
1. **Header & Profile**:
   - Shubharambh Realty logo, Notification bell.
   - Customer profile avatar with Amber badge 👥.
2. **Hero Banner**:
   - Modern luxury villa visual.
   - Title: *Find Your Dream Property*
   - Subtitle: *Buy, Invest and Build Your Future*
3. **Interactive Search Bar**:
   - Placeholder: *"Search by location, project or property..."*
4. **4 Category Pills**:
   - Residential: Soft Blue `#DBEAFE` / Icon `#2563EB` (*Homes*)
   - Commercial: Soft Peach `#FFEDD5` / Icon `#EA580C` (*Office & Shops*)
   - Plots: Soft Mint `#DCFCE7` / Icon `#16A34A` (*Land & Plots*)
   - Luxury: Soft Rose `#FFE4E6` / Icon `#E11D48` (*Villas & Premium*)
5. **Recommended Properties**:
   - *3 BHK Independent House (Lucknow, Uttar Pradesh)* — `₹ 85 Lakh` (`1600 sq.ft • 3 BHK • 3 Bath`).
   - *2 BHK Apartment (Gomti Nagar, Lucknow)* — `₹ 65 Lakh` (`1200 sq.ft • 2 BHK`).
   - Wishlist heart toggle icon.
6. **My Enquiries Tracker**:
   - *3 BHK in Gomti Nagar* — Status: `New` (`12 Oct 2026`).
   - *Plot in Faizabad Road* — Status: `Interested` (`10 Oct 2026`).
   - *2 BHK Apartment* — Status: `Site Visit` (`08 Oct 2026`).
7. **My Bookings Tracker**:
   - *Booking #SB12345 (3 BHK House, Lucknow)* — Status: `Confirmed` (`02 Oct 2026`).
8. **Bottom Navigation**:
   - Tabs: `Home`, `Search`, `Enquiries`, `Bookings`, `Profile`.

## 3. Technical Requirements
- Modern React + GPU-accelerated CSS animations.
- 90–120 FPS target response time with `< 16ms` interactions.

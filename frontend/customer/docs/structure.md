# Customer — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `customer/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
customer/
├── assets/
│   ├── logo.png                  # Master brand logo asset
│   ├── hero-slide-1.jpg          # Slide 1: Luxury Villa with Infinity Pool & Lake
│   ├── hero-slide-2.jpg          # Slide 2: High-Rise Luxury Condominium at Sunset
│   ├── hero-slide-3.jpg          # Slide 3: Contemporary Grand Mansion Estate
│   └── pic/                      # Project Gallery photos folder (auto-scanned dynamically)
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, category badges, booking pills [PROTECTED]
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & portal requirements
│   └── protect.md                # List of 100% frozen/protected files
├── components/
│   ├── CustomerHomeView.jsx      # Master reusable home screen view (Shared across all panels)
│   ├── Header.jsx                # Brand logo, Search, Wishlist with badge, Hamburger Menu
│   ├── HeroBanner.jsx            # "Find Your Dream Property" luxury villa visual with carousel dots
│   ├── OfferTicker.jsx           # Moving Offers & Verified Customer Testimonials continuous 120 FPS ticker
│   ├── SearchCard.jsx            # Buy/Sell tabs, Location with GPS icon, 3 dropdowns, Search CTA
│   ├── CategoryGrid.jsx          # 5 circular categories (Residential, Commercial, Plots, Luxury, Investment)
│   ├── PropertySection.jsx       # 101% Carbon-copy Plot / Project selection grid ("प्रोजेक्ट चुनें")
│   ├── ProjectLocationMap.jsx    # Interactive Google Map, GPS navigation, connectivity highlights, Free Cab Visit
│   ├── LeadershipSection.jsx     # Founder & Managing Director, Executive Directors, direct WhatsApp/Call contact
│   ├── StaggerTestimonials.jsx   # 101% Carbon-copy staggered fan cards testimonial slider with chamfered active card
│   └── BottomNavbar.jsx          # Home, Search, Post Property, My Property, Profile navigation
├── styles/
│   └── customer.css              # 90-120 FPS accelerated styles & theme tokens
├── CustomerApp.jsx               # Master React component with modal & state management
├── main.jsx                      # Vite React 18 client entry point
├── vite.config.js                # Vite development server configuration
├── package.json                  # React 18 & Vite dependency manifest
└── index.html                    # HTML entry point for Vite dev server
```

## Component Breakdown
- **Header**: Official Shubharambh logo and Wallet balance indicator.
- **HeroBanner**: Modern luxury architecture villa backdrop, "Find Your Dream Property" serif typography, 3 slider pagination dots.
- **OfferTicker**: 120 FPS hardware-accelerated ticker displaying live festive plot discount offers & verified client reviews with star ratings.
- **SearchCard**: Elevated floating search box with Buy/Sell toggle (toggling 'Sell' connects directly to Help Center & Sell Support), location text input with crosshair icon, 3 dropdown selectors (Property Type, Budget, Bedrooms), and gold Search Properties button.
- **CategoryGrid**: 5 color-coded circular icon items: Residential (Homes), Commercial (Office & Shops), Plots (Land & Plots), Luxury (Villas & Premium), Investment (High Returns).
- **PropertySection**: 100% Pure Live API Grid (Zero Dummy Data, includes 'Select Project' Overlay & API Error Popup Modal):
  - Header: "प्रोजेक्ट चुनें" dropdown containing only specific API `side_name` options (no 'all' option).
  - Status Legend & Plots Grid: Hidden until user selects a project (displays clean "कृपया प्रोजेक्ट चुनें" overlay).
  - 3-Column Plots grid dynamically mapped strictly from API `plots` array (only 'available' plots clickable for direct call booking).
- **ProjectLocationMap**: Live Google Map iframe embed strictly showing the selected project's location (`lat`, `lng` from API) with no chips row, 4 connectivity chips, "Google Maps पर देखें" GPS trigger, and "Book Free Cab Visit" action.
- **LeadershipSection**: Executive leadership cards showcasing Satyam Patel (Founder & Managing Director), R.K. Verma (Executive Director - Land & Legal), Amit Singh (Director - Sales & Finance) with trust badges, project count stats, and direct 1-tap WhatsApp and Phone contact triggers.
- **StaggerTestimonials**: 101% Carbon-Copy staggered fan photo gallery with interactive View Switcher (Normal Stagger View vs 2-Column 1-1 Square Phone Gallery Grid with Lightbox modal), chamfered center active image card, rotated side photo cards with dark borders, customizable image sources, and minimal navigation arrows (`←` / `→`).
- **BottomNavbar**: 5-tab docked bar with Home, Search, Post Property, My Property, and Profile tabs.
- **CustomerApp**: Top-level coordinator with live state, Help Center & Sell Support modal, dedicated Call-First Plot Booking modal (`tel:+917275004901` and WhatsApp details), and WhatsApp integration (`+91 7275004901`).

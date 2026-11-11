# Master UI Components & 90–120 FPS Motion Engineering Guide

> **Ecosystem Standard**: Centralized Blueprint for High-Performance UI Components & Micro-Interactions across all Shubharambh Realty Panels.  
> **Source Repositories**: [Uiverse.io](https://uiverse.io/) & [Hover.dev](https://www.hover.dev/components)

---

## ⚡ 1. 90–120 FPS Animation & Motion Engineering Rules

Jab bhi [Uiverse.io](https://uiverse.io/) ya [Hover.dev](https://www.hover.dev/) se koi animation ya component liya jaye, usko direct copy-paste **nahi** karna hai. Usko 90–120 FPS high refresh-rate standards ke mutabiq sanitize aur optimize karna mandatory hai:

### 🟢 GPU-Accelerated Only (Composite Layer)
- **Allowed Properties**: Animate **ONLY** `transform: translate3d(x, y, 0)`, `scale()`, `rotate()` aur `opacity`.
- **Strictly Banned in Animations**: Kabhi bhi `width`, `height`, `top`, `left`, `margin`, `padding`, ya `border-width` par CSS transitions na lagayein (yeh browser layout reflow trigger karte hain jisse frame drop hota hai).
- **Shadow & Filter Caution**: Heavy animated `box-shadow` aur `filter: blur()` continuous loop me na chalayein. Hover par pseudo-element (`::after`) ka `opacity` animate karein.

### ⏱️ Timing & Easing Curves
- **Micro-Interactions**: Button clicks, toggle switches, hover lifts: **`160ms – 240ms`**.
- **Panel Transitions & Modals**: Bottom sheets, slide-overs, dialogs: **`240ms – 320ms`**.
- **Master Cubic-Bezier**:
  ```css
  /* Ultra-smooth responsive spring */
  --ease-spring: cubic-bezier(0.16, 1, 0.3, 1);
  /* Snappy exit */
  --ease-out: cubic-bezier(0.4, 0, 0.2, 1);
  ```

### 🛠️ Hardware Acceleration Template
```css
/* 120 FPS Hardware Render Template */
.accelerated-ui-element {
  will-change: transform, opacity;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  transition: transform 200ms cubic-bezier(0.16, 1, 0.3, 1), 
              opacity 200ms cubic-bezier(0.16, 1, 0.3, 1);
}

.accelerated-ui-element:hover {
  transform: translate3d(0, -3px, 0) scale(1.015);
}
```

---

## 🏛️ 2. Panel-Wise Best Component & Animation Strategy

Har panel ki user psychology aur task velocity alag hoti hai. Niche har panel ke hisab se recommended component style aur source links diye gaye hain:

| Panel | UI Mood / Focus | Recommended Component Style | Best Sources |
| :--- | :--- | :--- | :--- |
| **Login & Auth** (`login/`) | Ultra-sleek, Trustworthy, Modern | Minimal glass inputs, magnetic login buttons, fluid OTP boxes, sleek spinners | Uiverse Inputs, Hover.dev Buttons |
| **Super Admin** (`super-admin/`) | High-density C-Suite, Luxury Gold | Data pulse cards, smooth metric counters, sleek KPI switches, compact toggles | Hover.dev Countdown/Cards, Uiverse Elements |
| **Admin** (`admin/`) | Operational Velocity, Clean Control | Action dropdowns, bulk select badges, property status pills, quick action buttons | Uiverse Buttons, Uiverse Forms |
| **RM (Rel. Manager)** (`rm/`) | Lead Pipeline & Fast CRM | Interaction cards, WhatsApp/Call quick buttons, lead status sliders, reminder badges | Hover.dev Cards, Uiverse Tooltips |
| **Agent** (`agent/`) | Gamified Sales, Commission Focus | Target progress rings, hot lead highlight cards, one-click property share, booking modals | Hover.dev Countdown, Uiverse Cards |
| **Customer Portal** (`customer/`) | Wow-Factor, Immersive Real Estate | Floating price tags, heart favorite bounce, interactive floorplan tooltips, EMI sliders | Hover.dev Cards, Uiverse Loaders |

---

## 🎨 3. Curated Component Library Catalog

### A. Buttons & CTAs
- **Primary CTA**: Clean gradient shift with subtle top light-reflection (`::after` sweep).
- **Secondary CTA**: Border glow on hover with 1.02x micro-scale.
- **Destructive/Danger CTA**: Snappy pulse on hold.
- **Reference Links**:
  - [Uiverse - Buttons Catalog](https://uiverse.io/buttons) *(Filter: CSS Buttons, Modern Minimal)*
  - [Hover.dev - Animated Buttons](https://www.hover.dev/components/buttons) *(Magnetic, Slide, Spotlight)*

---

### B. Cards & Metric Tiles
- **Dashboard Metric Cards**: Hover elevation (`translate3d(0, -4px, 0)`) with subtle border highlight.
- **Property Listing Cards**: High-res image container with smooth zoom (`scale(1.04)`) and sticky badge.
- **Reference Links**:
  - [Uiverse - Modern Cards](https://uiverse.io/cards) *(Glassmorphism, Bento Grid, Neomorphism)*
  - [Hover.dev - Interactive Cards](https://www.hover.dev/components/cards) *(Tilt card, Hover reveal, Shimmer)*

---

### C. Inputs, Search & Forms
- **Floating Label Inputs**: Instant border focus with hardware-accelerated label float (`translate3d(0, -18px, 0)`).
- **Real Estate Search Bar**: Expandable filter pill with instant debounce search.
- **Reference Links**:
  - [Uiverse - Form Inputs](https://uiverse.io/inputs) *(Floating labels, Search bars, Animated borders)*
  - [Uiverse - Complete Forms](https://uiverse.io/forms) *(Clean auth forms, Multi-step layouts)*

---

### D. Loaders & Skeleton States
- **Skeleton Pulse**: Opacity wave rather than heavy shimmer layout reflows.
- **Action Spinner**: Lightweight SVG ring with `stroke-dasharray` transition (Zero CPU lag).
- **Reference Links**:
  - [Uiverse - Fast CSS Loaders](https://uiverse.io/loaders) *(Minimal spinners, Progress bars)*
  - [Hover.dev - Dynamic Loaders](https://www.hover.dev/components/loaders) *(Morphing shapes, Smooth loops)*

---

### E. Micro-Elements & Indicators
- **Countdowns & Timers**: Token countdowns for exclusive property launch or token expiry.
- **Tooltips & Badges**: Zero-lag anchor positioned status tags (Verified, Sold, Available).
- **Reference Links**:
  - [Hover.dev - Countdown Components](https://www.hover.dev/components/countdown) *(Launch timers, Flash sale tickers)*
  - [Uiverse - Tooltips](https://uiverse.io/tooltips) *(Animated pointers, Smart bubble)*
  - [Uiverse - Interactive Elements](https://uiverse.io/elements) *(Toggles, Checkboxes, Sliders)*

---

## 🏛️ 5. Customer Portal (`customer/`) — Master Component Blueprints (101% Exact Carbon Copy)

Below are the production-ready, 90–120 FPS React component blueprints used across the customer interface:

### 1. Brand Header (`Header.jsx`)
- **Visuals**: Left-aligned official brand logo (`assets/logo.png`), right-aligned actions with search, wishlist heart with count badge (`3`), and hamburger menu (`☰`).
- **Characteristics**: Flat white background (`#FFFFFF`), sticky positioning, 0 duplicate text.

### 2. Luxury Hero Carousel (`HeroBanner.jsx`)
- **Visuals**: 3-image auto-sliding architectural carousel with touch-swipe support.
- **Typography Standard**:
  - `Find Your` (Clean sans `13.5px`, bold dark `#111827`)
  - `Dream` (Playfair Display serif `38px`, rich warm gold `#BF8226`)
  - `Property` (Playfair Display serif `34px`, dark forest green `#0F281E`)
  - `Buy, Sell & Invest in Properties with Trust` (2-line subtitle)
- **Pagination**: 3 flat indicator dots (active `#E08E1A`, inactive `#FFFFFF`).

### 3. Floating Search Card (`SearchCard.jsx`)
- **Zero-Shadow Mandate**: Clean flat white surface with crisp `1px solid #E5E7EB` border (NO drop-shadow).
- **Buy / Sell Pill Toggle**: Soft grey container (`#F1F3F6`), active `Buy` tab in `#BA821D` with house icon.
- **Location Field**: 📍 pin icon + placeholder + 🎯 GPS target locator icon.
- **3-Column Dropdowns**: `Property Type`, `Budget`, `Bedrooms` with downward chevrons `⌄`.
- **Search CTA**: Full-width rounded gold button with `🔍 Search Properties`.

### 4. 5 Real Estate Category Circles (`CategoryGrid.jsx`)
- **Single-Click Lock**: Element gets `disabled={true}` and `pointer-events: none` once selected to prevent repeated clicking.
- **5 Authentic SVG Icons**:
  1. **Residential**: `#FEF7DA` (Pastel cream) / `#B88220` (House icon)
  2. **Commercial**: `#FFEEDD` (Pastel peach) / `#EA580C` (Twin office towers)
  3. **Plots**: `#DCFCE7` (Pastel mint) / `#16A34A` (Twin evergreen trees)
  4. **Luxury**: `#FFE4E6` (Pastel rose) / `#991B1B` (Classical mansion)
  5. **Investment**: `#FEF7DA` (Pastel yellow) / `#B45309` (Ascending growth bars)

### 5. Property Showcase Cards (`PropertySection.jsx`)
- **Visuals**: 2-column grid for `Featured Properties` and `Latest Properties`.
- **Badges**: Dark olive *"For Sale"* pill (`#463416`), circular wishlist button with heart toggle.
- **Specs Row**: House icon (SqFt) • Bed icon (BHK) • Bathtub icon (Bath) on a single clean divider line.

### 6. Bottom Dock Navigation (`BottomNavbar.jsx`)
- **5 Dock Tabs**: `Home` (Active gold `#BA821D`), `Search`, `Post Property`, `My Property`, `Profile`.

---

## 🔗 Master Source Index
- 🌐 [Uiverse.io Master](https://uiverse.io/)
- 🌐 [Hover.dev Master](https://www.hover.dev/components)
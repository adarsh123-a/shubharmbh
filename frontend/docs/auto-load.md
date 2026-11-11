# Shubharambh Realty - Project Guidelines & Overview

## Project Architecture
This project is structured based on the 5 distinct user roles and authentication gateway:

### Modules & Roles
1. **`login/`**
   - Authentication gateway for all user roles.
   - Contains `docs/` for specifications.

2. **`super-admin/`**
   - Super Admin Dashboard (Full organizational control, revenue metrics, overall property & user status).
   - Contains `docs/`.

3. **`admin/`**
   - Admin Dashboard (Manage properties, enquiries, RM team tracking, property status).
   - Contains `docs/`.

4. **`rm/`**
   - Relationship Manager Dashboard (Tasks, site visits, customer calls, enquiry pipeline).
   - Contains `docs/`.

5. **`agent/`**
   - Agent Dashboard (Assigned properties, client enquiries, bookings, follow-ups).
   - Contains `docs/`.

6. **`customer/`**
   - Customer Portal & Mobile App (Property search, categories, enquiries tracking, booking details).
   - Contains `docs/`.

---

## 🎨 Master UI Assets & Global Information Standards

### 1. Reference Demo UI: `docs/main-ui.jpeg`
- **Visual Blueprint**: `docs/main-ui.jpeg` is the official reference design and visual benchmark for all screens.
- **Mandatory Usage**: Jab bhi kisi panel (`super-admin`, `admin`, `rm`, `agent`, `customer`, `login`) mein nayi UI banayi jaye, toh `docs/main-ui.jpeg` ko reference karke visual styling, layout, card structure aur spacing replicate karni hai.

### 2. Official Brand Logo: `docs/logo.png`
- **Master Logo Asset**: `docs/logo.png` Shubharambh Realty ka official brand logo hai.
- **Asset Sharing**: Agar kisi panel ke assets/components folder mein logo nahi hai, toh `docs/logo.png` se copy karke use karein. Koi placeholder ya unauthorized logo use na karein.

### 3. Company Information Source: `information.md`
- **Single Source of Truth**: Company ka official name, mobile/phone numbers, email address, physical office addresses aur legal details root `information.md` mein centralized rahenge.
- **Universal Usage**: Sabhi panels (headers, footers, contact dialogs, enquiry cards, profile pages) ko yahi information use karni hai.

### 4. Master Shared Components: `docs/main-component/`
- **Global Component Repository**: Sabhi panels ke liye master reusable aur reference UI components `docs/main-component/` ke andar rahenge.

---

## 💎 100% Human-Crafted Code Standards & Minimalistic Architecture (101% ENFORCED)

> [!CRITICAL]
> **ABSOLUTE CODE QUALITY MANDATE FOR ALL PANELS (`login`, `super-admin`, `admin`, `rm`, `agent`, `customer`):**

### 1. Minimal Lines of Code (DRY & KISS)
- **Extreme Brevity & Elegance**: Code bilkul minimal lines mein likha hona chahiye. Koi bhi unnecessary boilerplate, over-engineering ya bloated abstractions strictly prohibited hain.
- **Single-Responsibility Components**: Components focused, clean aur compact hone chahiye (tight modular components under 60–100 lines).
- **Reusable Utility & Shared Hooks**: Common logic ko compact hooks ya utility functions mein compress karein.

### 2. 100% Human-Written Feel (Zero "AI-Generated" Markers)
- **Natural Senior-Engineer Style**: Code aur UI ka design aisa hona chahiye jise dekh kar lage ki kisi top-tier senior human engineer ne thoughtfully design aur write kiya hai.
- **No Robotic/AI Comments**: Synthetic ya unwanted comments jaise `// This renders component` ya `// React hook for state` bilkul na ho. Code khud self-documenting ho.
- **Intuitive Naming & Clean Semantics**: Variable names, function names aur CSS class names bilkul natural, modern aur professional hon (`status-pill`, `metric-card`, `activeTab`, `isScrolled`).
- **Production-Ready & Robust**: Clean error boundaries, modern flex/grid layouts, clean JSX without deeply nested pyramids.

---

## 🚀 Frontend Tech Stack & 90–120 FPS Performance Architecture

> [!IMPORTANT]
> **MANDATORY FOR ALL PANELS & UI WORK:**
> Every module and dashboard across Shubharambh Realty must adhere strictly to these frontend technology and performance mandates.

### 1. Core Framework: React
- **Engine**: Modern **React** (Functional Components + Hooks).
- **Architecture**: Clean, modular component tree with reusable atomic UI blocks (Cards, Badges, Modals, Navbars, Charts).
- **Reactivity & State**: Efficient state management with zero redundant re-renders (`useMemo`, `useCallback`, `React.memo` where beneficial).

### 2. ⚡ High Refresh Rate: 90 FPS – 120 FPS Smooth Response Time
- **Zero Lag Target**: The user interface must feel native, fluid, and instant. Interactions must register within `< 16ms` (targeting 120Hz display standards).
- **Core Web Vitals Standard**:
  - **INP (Interaction to Next Paint)**: `< 50ms` (Instant feedback).
  - **LCP (Largest Contentful Paint)**: `< 1.2s`.
  - **CLS (Cumulative Layout Shift)**: `0` (Strictly zero visual shifts).

### 3. 🧈 Buttery-Smooth Animation & Motion Engineering
- **GPU-Accelerated Rendering**:
  - Animate ONLY composite-only CSS properties: `transform` (using hardware-accelerated `translate3d(x, y, 0)`) and `opacity`.
  - Never animate layout-triggering properties (`width`, `height`, `top`, `left`, `margin`, `padding`).
- **Motion Curves**:
  - Use premium easing curves: `cubic-bezier(0.16, 1, 0.3, 1)` (spring-like fluid response) and `cubic-bezier(0.4, 0, 0.2, 1)`.
  - Keep micro-animations snappy: `180ms – 280ms` for interactions (hover, tap, active press states).
- **Rendering Optimizations**:
  - Use `contain: layout style paint` or `content-visibility: auto` on heavy feeds and listing cards.
  - Enable native momentum scrolling: `-webkit-overflow-scrolling: touch` with smooth inertial behavior.

---

## 🎯 101% Exact Carbon-Copy UI Mandate & Strict Pre-Edit Permission (100% ENFORCED)

> [!CRITICAL]
> **ABSOLUTE PROTOCOL FOR ALL AI ACTIONS & CODE GENERATION:**

### 1. 101% Exact Carbon-Copy UI Replication (Zero Creative Liberties)
- **Zero Self-Modifications**: Jab bhi user koi UI screenshot ya reference image provide kare, AI apne mann se **kuch bhi add, delete ya modify nahi karega**.
- **Carbon Copy Standard**: Visual design ko 101% exact, pixel-to-pixel, color-to-color, aur font-to-font React + CSS me copy karna mandatory hai.
- Agar image me shadow nahi hai, toh code me bhi bilkul shadow nahi hoga (`box-shadow: none`). Agar logo me duplicate text nahi hai, toh code me bhi nahi aayega.
- Har ek icon shape, button curve, spacing, aur element placement image ke exactly identical honi chahiye.

### 2. Mandatory Pre-Edit Permission Protocol (Zero Unapproved File Edits)
- **Explicit Approval Required**: Kisi bhi file ko modify ya generate karne se pehle, AI pehle user ko explain karega:
  1. **File Path**: Kis file me edit hone wala hai.
  2. **Proposed Action**: Kya changes kiye jayenge aur kyun.
- User ke clear confirmation/permission ke baad hi AI file modification execute karega.

---

## General Rules
- Keep all documentation and assets for respective roles inside their individual `docs/` directory.
- Follow consistent UI styling, color scheme, and typography across all portals.

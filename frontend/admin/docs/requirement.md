# Admin — Functional & Dashboard Requirements

## 1. Role Scope & Authority
Admin manages local property inventory, handles incoming customer enquiries, and supervises the RM (Relationship Manager) team.

## 2. Key Screen Components (from Reference Design)
1. **Header & Profile**:
   - Shubharambh Realty logo, Notification bell with count `6`.
   - Admin profile avatar with Gold Shield 🛡️ badge.
2. **Hero Banner**:
   - Title: *Admin Dashboard*
   - Subtitle: *Manage properties, enquiries and team activity*
3. **4 Key KPI Stat Cards**:
   - Total Properties: `86` (`+10%`, Sky Blue `#0284C7`)
   - Total Enquiries: `210` (`+16%`, Mint Green `#16A34A`)
   - Total Customers: `54` (`+8%`, Tangerine `#EA580C`)
   - Total RMs: `12` (Violet Purple `#7C3AED`)
4. **Enquiries Overview Chart**:
   - 30-day timeline graph (peak: `18 Enquiries` on `16 Oct 2026`).
5. **Property Status Donut Breakdown (Total: 86)**:
   - For Sale: `42` (`#0D9488` Teal Green)
   - Sold: `18` (`#0284C7` Ocean Blue)
   - Unavailable: `12` (`#EF4444` Coral Red)
   - Draft: `14` (`#94A3B8` Slate Gray)
6. **Recent Enquiries Feed**:
   - Rahul Sharma: *3 BHK in Gomti Nagar* — Status `New` (`10 mins ago`).
   - Preeti Kumar: *Plot in Faizabad Road* — Status `Interested` (`25 mins ago`).
   - Amit Mishra: *Independent House* — Status `Site Visit` (`1 hour ago`).
   - Sneha Gupta: *2 BHK Apartment* — Status `Follow Up` (`2 hours ago`).
7. **Bottom Navigation**:
   - Tabs: `Dashboard`, `Properties`, `Enquiries`, `Team`, `More`.

## 3. Technical Requirements
- Modern React + GPU-accelerated CSS animations.
- 90–120 FPS target response time with `< 16ms` interactions.

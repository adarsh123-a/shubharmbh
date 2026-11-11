# RM (Relationship Manager) — Functional & Dashboard Requirements

## 1. Role Scope & Authority
Relationship Managers focus on customer conversions, following up on leads, scheduling on-site visits, and client relationship management.

## 2. Key Screen Components (from Reference Design)
1. **Header & Profile**:
   - Shubharambh Realty logo, Notification bell with count `4`.
   - RM profile avatar with Amber badge 🧑‍🤝‍🧑.
2. **Hero Banner**:
   - Title: *RM Dashboard*
   - Subtitle: *Manage your enquiries and customers*
3. **4 Key KPI Stat Cards**:
   - My Enquiries: `18` (`+20%`, Sky Blue `#0284C7`)
   - My Customers: `12` (`+9%`, Tangerine `#EA580C`)
   - Site Visits: `6` (Amber `#D97706`)
   - Bookings: `3` (Purple `#9333EA`)
4. **Today's Tasks (Time-Stamped Schedule)**:
   - `10:00 AM`: *Site Visit - Rahul Sharma (Gomti Nagar, Lucknow)* — Badge: `Upcoming` (`#DCFCE7` / `#16A34A`).
   - `12:00 PM`: *Call - Preeti Kumar (Discuss budget)* — Action: `Call` (`#DBEAFE` / `#2563EB`).
   - `02:30 PM`: *Site Visit - Amit Mishra (Faizabad Road)* — Badge: `Upcoming` (`#DCFCE7` / `#16A34A`).
   - `04:00 PM`: *Follow Up - Sneha Gupta (Send property details)* — Action: `Follow Up` (`#FFE4E6` / `#E11D48`).
5. **My Enquiries Tab Filters**:
   - Filter Tabs: `New (6)` (Active `#B45309`), `Interested (4)`, `Site Visit (3)`, `Follow Up (5)`.
   - Customer Lead Cards: Avatar initials, name, inquiry topic, status badge, timestamp.
6. **Bottom Navigation**:
   - Tabs: `Dashboard`, `Enquiries`, `Customers`, `Visits`, `More`.

## 3. Technical Requirements
- Modern React + GPU-accelerated CSS animations.
- 90–120 FPS target response time with `< 16ms` interactions.

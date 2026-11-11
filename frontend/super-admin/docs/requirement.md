# Super Admin — Functional & Dashboard Requirements

## 1. Role Scope & Authority
Super Admin holds root organizational visibility across all properties, users, finances, and enquiries.

## 2. Key Screen Components (from Reference Design)
1. **Header & Profile**:
   - Shubharambh Realty logo, Notification bell with badge count `12`.
   - Super Admin profile chip with Crown icon 👑.
2. **Hero Banner**:
   - Title: *Super Admin Dashboard*
   - Subtitle: *Complete control over your real estate business*
3. **8 Primary Metric KPI Cards**:
   - Total Properties: `128` (`+12%`, Sky Blue `#0284C7`)
   - Total Enquiries: `342` (`+18%`, Mint Green `#16A34A`)
   - Total Customers: `96` (`+8%`, Tangerine `#EA580C`)
   - Total Admins: `24` (Purple `#9333EA`)
   - Total RMs: `18` (Cyan Blue `#0284C7`)
   - Total Agents: `320` (Rose Crimson `#E11D48`)
   - Total Revenue: `₹ 18.5 L` (`+15%`, Amber Gold `#D97706`)
   - Total Bookings: `428` (`+22%`, Magenta Pink `#DB2777`)
4. **Enquiries Overview Chart**:
   - 30-day timeline graph (peak: `28 Enquiries` on `18 Oct 2026`).
5. **Property Status Donut Breakdown (Total: 128)**:
   - For Sale: `68` (`#0D9488` Teal)
   - Sold: `18` (`#0284C7` Ocean Blue)
   - Unavailable: `12` (`#F43F5E` Rose Coral)
   - Draft: `30` (`#94A3B8` Slate)
6. **Recent Properties**:
   - Listing previews (e.g. *3 BHK Independent House ₹85 Lakh*, *2 BHK Apartment ₹65 Lakh*).
7. **Bottom Navigation**:
   - Tabs: `Dashboard`, `Properties`, `Enquiries`, `Users`, `More`.

## 3. Technical Requirements
- Modern React + GPU-accelerated CSS animations.
- 90–120 FPS target response time with `< 16ms` interactions.

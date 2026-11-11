# 👥 Customer — Auto-Load Controller

## Required
> [!IMPORTANT]
> The following files are strictly mandatory and MUST be automatically loaded into context before executing any task or command in this module:
- `color-combination.md` — Customer Luxury Midnight Palette, Category Colors, Property & Booking Tags
- `structure.md` — Module Directory, Component Tree & Auto-Sync Map
- `requirement.md` — Functional & Portal Requirements
- `protect.md` — Frozen / Protected Files Registry (Zero Edit Enforcement)

---

## Role Identity & Scope
- **Role**: Customer (Buyer / Investor / Tenant)
- **Scope**: Dream property search, category filtering (Residential, Commercial, Plots, Luxury), recommended listings, enquiries tracking, and bookings.

---

## Execution Directives
1. Verify all files listed in `## Required` are loaded into context.
2. Check `protect.md` before performing ANY file write/edit. Refuse edits to protected files.
3. If files are added or deleted, immediately update `structure.md`.
4. All components, styles, and logic must strictly stay within `customer/`.
5. Support luxury hero banner, search bar, interactive categories, and enquiry/booking trackers.
6. Maintain 90–120 FPS React component performance standards.

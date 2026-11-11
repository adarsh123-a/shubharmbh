# Super Admin — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `super-admin/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
super-admin/
├── SuperAdminApp.jsx             # Master Super Admin Controller & Route Switcher
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, 8 stat colors, donut palettes
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & dashboard requirements
│   └── protect.md                # List of 100% frozen/protected files
├── components/                   # React UI components
│   ├── SuperAdminHeader.jsx      # Brand logo, notifications (12), Crown profile badge
│   ├── SuperAdminSidebarDrawer.jsx # Slide-in executive drawer with portal switcher & contact info
│   ├── SuperAdminNotificationDrawer.jsx # Executive alerts drawer with unread count updates
│   ├── SuperAdminBottomNavbar.jsx# 5 Tabs: Dashboard, Properties, Enquiries (24), Users, More
│   ├── SuperAdminDashboardView.jsx# 101% Carbon Copy (8 KPIs, Blue Line Graph, Donut Chart, Recent Properties)
│   ├── SuperAdminPropertiesView.jsx# 128 Properties Platform Inventory
│   ├── SuperAdminAddPropertyModal.jsx # Enterprise Property Form Modal
│   ├── SuperAdminEnquiriesView.jsx # 342 Global Enquiries Stream
│   ├── SuperAdminUsersView.jsx   # 458 Enterprise User Accounts (Admins, RMs, Agents, Customers)
│   ├── SuperAdminAddUserModal.jsx # User Provisioning Modal
│   └── SuperAdminMoreView.jsx    # Corporate Headquarters, Revenue Metrics, Governance
└── styles/
    └── super-admin.css           # 90-120 FPS accelerated styles
```

## Route & Component Breakdown
- **SuperAdminApp (`SuperAdminApp.jsx`)**: Coordinates route state (`dashboard`, `properties`, `enquiries`, `users`, `more`) and renders corresponding views with header and bottom dock.
- **Header (`SuperAdminHeader.jsx`)**: Hamburger menu, Shubharambh Realty brand logo, notification bell with count `12`, Super Admin profile avatar, and Super Admin role pill.
- **Bottom Navigation (`SuperAdminBottomNavbar.jsx`)**: 5 tabs with Shubharambh Gold active indicator (`#D97706`) and red `24` badge on Enquiries tab.
- **Dashboard Route (`SuperAdminDashboardView.jsx`)**: Hero card with villa visual, 8 KPI tiles, Enquiries 30-day royal blue timeline chart with peak tooltip (`28 Enquiries`), Property Status donut chart (128 Total), and Recent Properties feed.
- **Properties Route (`SuperAdminPropertiesView.jsx`)**: Complete 128 platform listings with status filters.
- **Enquiries Route (`SuperAdminEnquiriesView.jsx`)**: 342 total lead stream with branch and RM tracking.
- **Users Route (`SuperAdminUsersView.jsx`)**: Enterprise user directory (24 Admins, 18 RMs, 320 Agents, 96 Customers).
- **More Route (`SuperAdminMoreView.jsx`)**: Corporate headquarters information, revenue breakdown, and settings.

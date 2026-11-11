# Admin — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `admin/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
admin/
├── AdminApp.jsx                  # Master Admin Controller & Route Switcher
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, 4 stat colors, enquiry badges
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & dashboard requirements
│   └── protect.md                # List of 100% frozen/protected files
├── components/                   # React UI components
│   ├── AdminHeader.jsx           # Brand logo, notifications (6), Shield profile badge
│   ├── AdminSidebarDrawer.jsx    # Slide-in navigation drawer with portal switcher & contact info
│   ├── AdminNotificationDrawer.jsx # Notification drawer with interactive unread badge updates
│   ├── AdminBottomNavbar.jsx     # 5 Tabs: Dashboard, Properties, Enquiries, Team, More
│   ├── AdminDashboardView.jsx    # 101% Carbon Copy (KPIs, 30-Day Line Graph, Donut Breakdown, Recent Enquiries)
│   ├── AdminPropertiesView.jsx   # 86 Properties Inventory (For Sale, Sold, Unavailable, Draft)
│   ├── AdminAddPropertyModal.jsx # Admin Inventory Property Form Modal
│   ├── AdminEnquiriesView.jsx    # 210 Central Enquiries Stream with RM Assignments
│   ├── AdminTeamView.jsx         # 12 Relationship Managers Roster & Supervision
│   ├── AdminAddRMModal.jsx       # Register Relationship Manager Modal Form
│   └── AdminMoreView.jsx         # Operations Desk, Branch Summary, and Support Contacts
└── styles/
    └── admin.css                 # 90-120 FPS accelerated styles
```

## Route & Component Breakdown
- **AdminApp (`AdminApp.jsx`)**: Coordinates route state (`dashboard`, `properties`, `enquiries`, `team`, `more`) and renders corresponding views with header and bottom dock.
- **Header (`AdminHeader.jsx`)**: Hamburger menu, Shubharambh Realty brand logo, notification bell with count `6`, Admin profile avatar, and Admin role pill.
- **Bottom Navigation (`AdminBottomNavbar.jsx`)**: 5 tabs with Shubharambh Gold active indicator (`#D97706`).
- **Dashboard Route (`AdminDashboardView.jsx`)**: Hero card with villa visual, 4 KPI tiles (Properties: 86, Enquiries: 210, Customers: 54, RMs: 12), Enquiries 30-day timeline chart with peak tooltip, Property Status donut chart (86 Total), and Recent Enquiries feed.
- **Properties Route (`AdminPropertiesView.jsx`)**: Complete 86 platform property listings with status filters.
- **Enquiries Route (`AdminEnquiriesView.jsx`)**: 210 total lead stream with assignment management.
- **Team Route (`AdminTeamView.jsx`)**: 12 RM team directory with performance and site visit stats.
- **More Route (`AdminMoreView.jsx`)**: Operations center controls and company credentials.

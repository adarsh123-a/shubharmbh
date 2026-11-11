# Agent — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `agent/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
agent/
├── AgentApp.jsx                  # Master Agent Controller & Route Switcher
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, property badges, enquiry pills
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & dashboard requirements
│   └── protect.md                # List of 100% frozen/protected files
├── components/                   # React UI components for routes & layout
│   ├── AgentHeader.jsx           # Top Header (Hamburger, Logo, Bell '2', Profile, Role Pill)
│   ├── AgentSidebarDrawer.jsx    # Slide-in navigation drawer with portal switcher & contact info
│   ├── AgentNotificationDrawer.jsx # Notification drawer with interactive unread badge updates
│   ├── AgentBottomNavbar.jsx     # 5-Tab Navigation Bar (Dashboard, Properties, Enquiries, Customers, More)
│   ├── AgentDashboardView.jsx    # Dashboard Route View (KPIs, Properties preview, Recent Enquiries)
│   ├── AgentPropertiesView.jsx   # Properties Route View (12 listings, filters, search)
│   ├── AgentAddPropertyModal.jsx # Add Property Modal Form (Interactive listing creator)
│   ├── AgentEnquiriesView.jsx    # Enquiries Route View (28 leads, Call/WhatsApp actions, filters)
│   ├── AgentCustomersView.jsx    # Customers Route View (16 assigned clients, pipeline stages)
│   └── AgentMoreView.jsx         # More Route View (Profile, 4 Bookings, Office details, Settings)
└── styles/
    └── agent.css                 # 90-120 FPS accelerated styles
```

## Route & Component Breakdown
- **AgentApp (`AgentApp.jsx`)**: Coordinates route state (`dashboard`, `properties`, `enquiries`, `customers`, `more`) and renders corresponding view with header and bottom dock.
- **Header (`AgentHeader.jsx`)**: Hamburger menu, Shubharambh Realty brand logo, notification bell with count `2`, agent profile avatar, and RM/Agent role pill.
- **Bottom Navigation (`AgentBottomNavbar.jsx`)**: 5 tabs with Shubharambh Gold active indicator (`#D97706`).
- **Dashboard Route (`AgentDashboardView.jsx`)**: Hero card with villa visual, 4 KPI tiles, My Properties preview, and Recent Enquiries feed with one-touch phone dial.
- **Properties Route (`AgentPropertiesView.jsx`)**: Full portfolio inventory with Active/Pending filters and search.
- **Enquiries Route (`AgentEnquiriesView.jsx`)**: Customer inquiry stream with one-touch Call and WhatsApp actions.
- **Customers Route (`AgentCustomersView.jsx`)**: Assigned client management and pipeline stage tracking.
- **More Route (`AgentMoreView.jsx`)**: Verified agent credentials, bookings performance, and company contacts.

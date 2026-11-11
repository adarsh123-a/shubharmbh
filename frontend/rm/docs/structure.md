# RM (Relationship Manager) — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `rm/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
rm/
├── RMApp.jsx                     # Master RM Controller & Route Switcher
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, task buttons, filter pills
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & dashboard requirements
│   └── protect.md                # List of 100% frozen/protected files
├── components/                   # React UI components
│   ├── RMHeader.jsx              # Brand logo, notifications (2), RM profile badge
│   ├── RMSidebarDrawer.jsx       # Slide-in navigation drawer with portal switcher & contact info
│   ├── RMNotificationDrawer.jsx  # Notification drawer with interactive unread badge updates
│   ├── RMBottomNavbar.jsx        # 5 Tabs: Dashboard, Enquiries, Customers, Visits, More
│   ├── RMDashboardView.jsx       # 101% Carbon Copy (KPIs, Today's Tasks Timeline, My Enquiries Feed)
│   ├── RMEnquiriesView.jsx       # 18 Leads with Call & WhatsApp triggers
│   ├── RMCustomersView.jsx       # 12 Relationship accounts with deal stages
│   ├── RMVisitsView.jsx          # 6 Scheduled Property Site Walkthroughs
│   ├── RMScheduleVisitModal.jsx  # Interactive Site Visit Scheduling Form
│   └── RMMoreView.jsx            # RM Profile, Bookings performance, Support desk
└── styles/
    └── rm.css                    # 90-120 FPS accelerated styles
```

## Route & Component Breakdown
- **RMApp (`RMApp.jsx`)**: Coordinates route state (`dashboard`, `enquiries`, `customers`, `visits`, `more`) and renders corresponding views with header and bottom dock.
- **Header (`RMHeader.jsx`)**: Hamburger menu, Shubharambh Realty brand logo, notification bell with count `2`, RM profile avatar, and RM role pill.
- **Bottom Navigation (`RMBottomNavbar.jsx`)**: 5 tabs with Shubharambh Gold active indicator (`#D97706`).
- **Dashboard Route (`RMDashboardView.jsx`)**: Hero card with villa visual, 4 KPI tiles (Enquiries: 18, Customers: 12, Visits: 6, Bookings: 3), Today's Tasks vertical timeline with action buttons, and My Enquiries feed.
- **Enquiries Route (`RMEnquiriesView.jsx`)**: Filterable lead stream with one-touch phone dial and WhatsApp chat.
- **Customers Route (`RMCustomersView.jsx`)**: Assigned accounts with next action tracking.
- **Visits Route (`RMVisitsView.jsx`)**: Site walkthroughs agenda and map directions.
- **More Route (`RMMoreView.jsx`)**: Profile desk, bookings summary, and legal contacts.

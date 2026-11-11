# Login & Auth — Directory & Component Structure

> [!NOTE]
> **AUTO-SYNC DIRECTIVE**: Whenever any file or component is added, renamed, or deleted within `login/`, this `structure.md` file MUST be updated immediately.

## Directory Structure
```
login/
├── docs/
│   ├── auto-load.md              # Master controller & required files orchestrator
│   ├── color-combination.md      # Theme tokens, brand colors, role badges
│   ├── structure.md              # File & component tree (this file)
│   ├── requirement.md            # Functional & technical requirements
│   └── protect.md                # List of 100% frozen/protected files
├── services/
│   └── authService.js            # Frontend API client contract with credentials: include
├── styles/
│   └── login.css                 # 90-120 FPS accelerated styles
└── LoginApp.jsx                  # Main Auth Gateway with Multi-Role selector & routing
```

## Component Architecture
- **LoginApp**: Master authentication gateway with dual Sign In / Register modes, role selector pills, form validation, and role-based redirecting (`super_admin` ➔ `/super-admin`, `admin` ➔ `/admin`, `rm` ➔ `/rm`, `agent` ➔ `/agent`, `customer` ➔ `/`).
- **authService**: Centralized API connector binding to `http://localhost:5000/api/auth` with cookie support (`credentials: 'include'`).
- **login.css**: GPU-accelerated styling adhering to Shubharambh brand tokens.

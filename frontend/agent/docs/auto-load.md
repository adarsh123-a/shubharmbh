# 🧑‍💼 Agent — Auto-Load Controller

## Required
> [!IMPORTANT]
> The following files are strictly mandatory and MUST be automatically loaded into context before executing any task or command in this module:
- `color-combination.md` — Agent Indigo/Violet Theme, Property Status Tags, Enquiry Badges
- `structure.md` — Module Directory, Component Tree & Auto-Sync Map
- `requirement.md` — Functional & Dashboard Requirements
- `protect.md` — Frozen / Protected Files Registry (Zero Edit Enforcement)

---

## Role Identity & Scope
- **Role**: Agent (Real Estate Agent / Property Representative)
- **Scope**: Portfolio property management, lead handling, customer enquiry responses, and bookings.

---

## Execution Directives
1. Verify all files listed in `## Required` are loaded into context.
2. Check `protect.md` before performing ANY file write/edit. Refuse edits to protected files.
3. If files are added or deleted, immediately update `structure.md`.
4. All components, styles, and logic must strictly stay within `agent/`.
5. Support property cards with status tags (`Active`, `Pending`) and direct contact actions.
6. Maintain 90–120 FPS React component performance standards.

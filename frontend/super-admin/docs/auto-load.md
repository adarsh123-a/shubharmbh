# 👑 Super Admin — Auto-Load Controller

## Required
> [!IMPORTANT]
> The following files are strictly mandatory and MUST be automatically loaded into context before executing any task or command in this module:
- `color-combination.md` — Super Admin Design Tokens, 8 Stat Card Colors, Chart & Donut Palettes
- `structure.md` — Module Directory, Component Tree & Auto-Sync Map
- `requirement.md` — Functional & Dashboard Requirements
- `protect.md` — Frozen / Protected Files Registry (Zero Edit Enforcement)

---

## Role Identity & Scope
- **Role**: Super Admin (Enterprise Executive / Platform Owner)
- **Scope**: Platform-wide analytics, revenue stats, properties inventory status, user hierarchies (Admins, RMs, Agents, Customers), and booking metrics.

---

## Execution Directives
1. Verify all files listed in `## Required` are loaded into context.
2. Check `protect.md` before performing ANY file write/edit. Refuse edits to protected files.
3. If files are added or deleted, immediately update `structure.md`.
4. All components, styles, and logic must strictly stay within `super-admin/`.
5. Adhere to Midnight Navy & Shubharambh Gold themes with Crown 👑 badges.
6. Maintain 90–120 FPS React component performance standards.

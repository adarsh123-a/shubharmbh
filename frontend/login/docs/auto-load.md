# 🔐 Login & Auth — Auto-Load Controller

## Required
> [!IMPORTANT]
> The following files are strictly mandatory and MUST be automatically loaded into context before executing any task or command in this module:
- `color-combination.md` — Brand Colors, Theme Tokens, and Role Badge Palettes
- `structure.md` — Module Directory, Component Tree & Auto-Sync Map
- `requirement.md` — Functional & Technical Specifications
- `protect.md` — Frozen / Protected Files Registry (Zero Edit Enforcement)

---

## Role Identity & Scope
- **Module**: Login & Authentication Gateway
- **Scope**: Multi-role login, OTP verification, password authentication, and role-based redirect for all user types.

---

## Execution Directives
1. Verify all files listed in `## Required` are loaded into context.
2. Check `protect.md` before performing ANY file write/edit. Refuse edits to protected files.
3. If files are added or deleted, immediately update `structure.md`.
4. All components, styles, and logic must strictly stay within `login/`.
5. Maintain 90–120 FPS React component performance standards.

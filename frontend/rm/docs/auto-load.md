# 🧑‍🤝‍🧑 RM (Relationship Manager) — Auto-Load Controller

## Required
> [!IMPORTANT]
> The following files are strictly mandatory and MUST be automatically loaded into context before executing any task or command in this module:
- `color-combination.md` — RM Earthy Amber Palette, Task Action Badges, Filter Tab Colors
- `structure.md` — Module Directory, Component Tree & Auto-Sync Map
- `requirement.md` — Functional & Dashboard Requirements
- `protect.md` — Frozen / Protected Files Registry (Zero Edit Enforcement)

---

## Role Identity & Scope
- **Role**: RM (Relationship Manager)
- **Scope**: Daily tasks execution, client call management, site visit scheduling, and pipeline progression.

---

## Execution Directives
1. Verify all files listed in `## Required` are loaded into context.
2. Check `protect.md` before performing ANY file write/edit. Refuse edits to protected files.
3. If files are added or deleted, immediately update `structure.md`.
4. All components, styles, and logic must strictly stay within `rm/`.
5. Support action triggers (e.g. `Call`, `Follow Up`, `Site Visit`).
6. Maintain 90–120 FPS React component performance standards.

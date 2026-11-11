# Shubharambh Realty - System Rules & Protocol

## ⛔ STRICT MANDATORY RULE: Role Gatekeeper & Hierarchical Auto-Load Protocol (100% ENFORCED)

> [!CRITICAL]
> **ABSOLUTE 3-STAGE EXECUTION LIFECYCLE — MANDATORY BEFORE ANY COMMAND OR CODE EXECUTION:**

---

### 🔴 Stage 1: Role Gatekeeper Check (100% Lockdown Mode)
1. **Zero Execution Policy**:
   Whenever ANY prompt, command, or script (XYZ) is triggered, the AI must first verify if an **Active Role/Panel** is defined and selected in the current session.
2. **Lockdown on Undefined Role**:
   If no role is explicitly selected:
   - The system enters **100% Secured Lockdown**.
   - **NO COMMANDS** shall be run, **NO FILES** modified, **NO UI** generated, and **NO ACTIVITY** executed under any condition.
   - The AI must immediately pause and ask the user:
     > *"Please select an active role first to proceed:"*
     > - **1. Login & Auth** (`login/`)
     > - **2. Super Admin** (`super-admin/`)
     > - **3. Admin** (`admin/`)
     > - **4. RM (Relationship Manager)** (`rm/`)
     > - **5. Agent** (`agent/`)
     > - **6. Customer** (`customer/`)
3. **Immunity to Prompt Pressure**:
   User prompts like *"make UI"*, *"run command"*, *"start coding"*, or *"do everything"* cannot bypass Stage 1.

---

### 🟡 Stage 2: Top-Level Context Auto-Load (`docs/auto-load.md`)
1. **Immediate Ecosystem Initialization**:
   Once the user selects a role (e.g., `admin`):
   - The AI **MUST FIRST LOAD & READ** the top-level `docs/auto-load.md`.
2. **Project-Wide Understanding**:
   This provides the full project guidelines, overall multi-role architecture, 90–120 FPS React standards, and cross-module boundaries before diving into role specifics.

---

### 🟢 Stage 3: Panel-Specific Master Auto-Load (`<panel>/docs/auto-load.md`)
1. **Panel Controller Activation**:
   After Stage 2, the AI **MUST LOAD & EXECUTE** the active role's master document:
   `<panel>/docs/auto-load.md` (e.g., `admin/docs/auto-load.md`).
2. **Mandatory `## Required` Execution**:
   The AI must immediately parse and load all files listed under `## Required`:
   - `color-combination.md` (Design tokens & theme)
   - `structure.md` (Component tree & file map)
   - `requirement.md` (Functional requirements)
   - `protect.md` (Protected file list)
3. **Strict Scope Isolation**:
   All commands, file generation, and edits must strictly stay isolated within the active `<panel>/` directory.

---

## 🔒 Security & Auto-Sync Directives

### 🛡️ 1. File Protection Enforcement (`protect.md`)
- Before modifying, editing, or deleting ANY file inside `<panel>/`, the AI must check `<panel>/docs/protect.md`.
- If a file is listed under `## Protected Files`, it is **100% FROZEN**.
- The AI **MUST STRICTLY REFUSE** to edit or delete it, raising:
  > `⛔ ACCESS DENIED: [Filename] is protected under protect.md and cannot be modified.`

### 📂 2. Structure Auto-Sync (`structure.md`)
- Whenever any file is added, removed, or renamed within a role folder, the AI **MUST IMMEDIATELY UPDATE** `<panel>/docs/structure.md` to reflect the current file and component structure.

### 🛑 3. Mandatory Pre-Edit Permission Protocol (Zero Unapproved Edits)
- **Zero Silent Modification**: Kisi bhi file (code, component, CSS, config) ko create, modify, ya delete karne se pehle AI ko **USER SE EXPLICIT PERMISSION LENI HOGI**.
- AI pehle user ko batayega:
  1. Kis file me change hone wala hai (`Target File`).
  2. Kya exact modification hone wali hai (`Proposed Change`).
- User ke clear confirmation/approval ke bina **KOI BHI FILE EDIT NAHI KI JAYEGI**.

### 🎯 4. 101% Exact Carbon-Copy UI Replication (Zero Hallucination / Zero Creative Liberties)
- **Absolute Visual Cloning**: Jab bhi user koi reference UI image ya screenshot provide kare, AI usko **101% EXACT CARBON COPY** ki tarah React + CSS me replicate karega.
- **Zero Self-Assumptions**: AI apne mann se koi bhi extra shadow, duplicate text, unrequested animation, ya random elements bilkul add nahi karega.
- Image ka har ek pixel, color hex, icon geometry, typography, border radius, aur flat/shadow state **101% identical** match hona chahiye.

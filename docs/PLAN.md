# Development Plan: Agent Party Planner

## Phase 1: Setup & Research ✅

- [x] Initialize project directory and Git.
- [x] Document Vision and Architecture.
- [x] Extract and document core orchestration models (War Room, GM, Party Roles).
- [x] Scaffold the base project (Astro 5 + Tailwind 4 + Preact).
- [x] **Research:** Investigate orchestration patterns for Gemini, Claude, and OpenAI.

## Phase 2: Template Foundation ✅

- [x] Define the schema for "Class" characteristics and "Role" variables (`src/core/types.ts`).
- [x] Scaffold the default proven party preset (`src/core/presets/defaultParty.ts`).
- [x] **The Forge:** Implement core logic for merging variables into high-detail templates.
- [x] **Platform Adapters:** Create formatting rules for Gemini (`SKILL.md`), Claude (`task`), and OpenAI.
- [x] **Rich Prompts:** Enhance templates with seniority levels, communication protocols, and safety triggers.

## Phase 3: Visual Party Builder (The Tavern) 🏗️

- [ ] **War Room Configuration:** Design and implement the UI to toggle and configure Meta-Roles (Game Creator, etc.).
- [x] **The Roster:** Build the party composition screen with add/remove/recruit logic.
- [x] **Member Editor:** Implement the 3D "flip" modal for deep role customization.
- [x] **Relationship Mapping:** Implement the bond/tension editor within the character sheets.
- [x] **Responsibilities Catalog:** Add functionality to define and assign custom duties.
- [ ] **Persistence:** Implement `localStorage` syncing so configurations survive page refreshes.
- [ ] **Sharing:** Implement URL-based state (Base64/LZ-string) for one-click party sharing.
- [x] **Theming:** Set up the CSS variable-based system and apply the D&D "Slay the Spire" aesthetic.

## Phase 4: Export Engine (The Courier) ✅

- [x] Implement client-side ZIP generation using `jszip`.
- [x] **Platform Selection:** Connect the platform selector to the adapter logic.
- [x] **CLI Wrappers:** Generate `start-war-room.sh` and `start-quest.sh` with platform-specific commands.
- [x] **Instructional README:** Generate a rich "Getting Started" guide inside the exported package.

## Phase 5: Polishing & Generalization ⏳

- [ ] **Visual Polish:** Add card-entry animations and refine the "Forge" generation feedback.
- [ ] **Responsive QA:** Ensure the Member Editor and Roster Grid are flawless on mobile.
- [ ] **Agnosticism:** Verify that the core logic is fully decoupled from the D&D theme for future skins.
- [ ] **Community:** Integrate a "Buy Me a Coffee" button and finalize Open Source documentation.

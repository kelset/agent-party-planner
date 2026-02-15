# Development Plan: Agent Party Planner

## Phase 1: Setup & Research
- [x] Initialize project directory and Git.
- [x] Document Vision and Architecture.
- [ ] Confirm technical stack (resolve Bun installation if needed).
- [ ] Scaffold the base project (Astro + Tailwind).
- [x] **Research:** Investigate sub-agent/orchestration documentation for:
  - [x] Claude (Agent Teams vs. sub-agents, runtime spawning).
  - [x] Gemini (Formatting requirements, sub-agent definitions).
  - [x] Copilot / Codex (Limited public info, monitor updates).
  - [x] OpenAI Swarm / Agents SDK (Handoffs and Routines).

## Phase 2: Template Foundation
- [ ] Extract base templates from existing agent orchestration examples.
- [ ] Define the schema for "Class" characteristics and "Role" variables.
- [ ] Implement the core logic for merging variables into templates.
- [ ] **Adapter Logic:** Create a system to apply platform-specific formatting rules (e.g., Gemini `SKILL.md` vs. Claude `task`).

## Phase 3: Visual Party Builder
- [ ] Design and implement the "War Room" selection UI.
- [ ] Build the "Party Composition" screen (Class cards, add/remove logic).
- [ ] **State & Share:** Implement URL-based state sharing and local persistence.
- [ ] Create customization forms for individual agent roles.
- [ ] **Theming:** Set up the CSS variable-based skinning system.
- [ ] Apply the "D&D" theme (visuals, copy, icons).
## Phase 4: Export Engine
- [ ] Implement client-side ZIP generation.
- [ ] **Platform Selection:** Add a final step to select the target AI platform.
- [ ] **Customized Export:** Generate platform-specific folder structures and setup instructions.
- [ ] Add the "Download Your Party" functionality.

## Phase 5: Polishing & Generalization
- [ ] Refactor styles to use a robust theme-variable system.
- [ ] Add transitions and "fun" D&D-themed animations.
- [ ] Final visual QA on mobile and desktop.

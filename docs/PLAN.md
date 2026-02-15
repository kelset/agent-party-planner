# Development Plan: Agent Party Planner

## Phase 1: Setup & Research
- [x] Initialize project directory and Git.
- [x] Document Vision and Architecture.
- [ ] Confirm technical stack (resolve Bun installation if needed).
- [ ] Scaffold the base project (Astro + Tailwind).
- [ ] **Research:** Investigate sub-agent/orchestration documentation for:
  - [ ] Claude (Agent Teams vs. sub-agents, runtime spawning).
  - [ ] Gemini (Formatting requirements, sub-agent definitions).
  - [ ] Copilot / Codex (Support for team-based orchestration).
  - [ ] Others (OpenAI Swarm, etc.).

## Phase 2: Template Foundation
- [ ] Extract base templates from existing agent orchestration examples.
- [ ] Define the schema for "Class" characteristics and "Role" variables.
- [ ] Implement the core logic for merging variables into templates.
- [ ] **Adapter Logic:** Create a system to apply platform-specific formatting rules.

## Phase 3: Visual Party Builder
- [ ] Design and implement the "War Room" selection UI.
- [ ] Build the "Party Composition" screen (Class cards, add/remove logic).
- [ ] Create customization forms for individual agent roles.
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

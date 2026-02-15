# Vision: Agent Party Planner

## Core Concept

An interactive web-based tool to visually configure and export an "Agent Orchestration" system. The system follows a hierarchical structure inspired by a Dungeons & Dragons (D&D) session, where agents and sub-agents have dedicated roles and responsibilities.

## Hierarchical Levels

1. **The War Room (Meta-Level):**
   - The highest level of orchestration.
   - Users select their "Meta-Agents" or "War Room" members (e.g., the primary agent they are interacting with).
   - Responsible for the big picture and rule modifications.

2. **The GM Session:**
   - The GM agent acts as the coordinator.
   - Receives quests (tasks) and delegates them to the Party.
   - Spawns characters/sub-agents in a specific order to ensure workflow completion.

3. **The Party (Sub-Agents):**
   - Individual agents with specialized "Classes" (e.g., Ranger, Warrior, Wizard).
   - Each class has a core role (e.g., the Ranger handles measurements and scouting).
   - Users can customize these roles and their characteristics.

## User Experience

- **Visual Party Composition:** A fun, high-quality UI where users can see representations of different classes.
- **Agent Targeting:** Before export, users specify their target AI platform (e.g., Gemini, Claude, Copilot) to ensure the orchestration is formatted correctly for that specific ecosystem.
- **Customization:** Tweak class roles, characteristics, and orchestration rules through simple UI inputs (no manual prompting required).
- **One-Click Export:** Generate and download a ZIP package containing the entire orchestration setup (prompts, configuration, and folder structure).

## Target Agent Compatibility

The tool aims to support various AI ecosystems, acknowledging that each has unique ways of handling sub-agents:

- **Gemini:** Requires specific formatting for sub-agents (e.g., defined in the system instruction).
- **Claude:** Supports sub-agents and "Agent Teams" with the ability to spawn agents at runtime via the `task` command.
- **Others (Codex, Copilot, etc.):** Investigate and implement support for their specific orchestration patterns.
- **Dynamic Guidance:** The exported package should include tailored setup instructions based on the selected target agent's capabilities (e.g., manual installation vs. runtime spawning).

## Long-Term Goal

- **Agnostic Architecture:** While the initial launch is D&D themed, the underlying architecture should allow for easy "reskinning" (e.g., a Star Trek theme) by swapping out the UI/Theming layer without touching the core orchestration logic.

- **Fully Open Source:** The project is intended to be a public resource. By open-sourcing the orchestration logic and the tool itself, we aim to foster community contribution and transparency.

- **Community Support:** Once the tool is functional and polished, we will integrate a "Buy Me a Coffee" (or similar) button to allow users who find value in the tool to support its development and hosting.

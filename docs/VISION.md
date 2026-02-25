# Vision: Agent Party Planner

## Core Concept

An interactive web-based tool to visually configure and export an "Agent Orchestration" system. The system follows a hierarchical structure inspired by a Dungeons & Dragons (D&D) session, where agents and sub-agents have dedicated roles and responsibilities.

## Hierarchical Levels

_(For full details, see the [Orchestration Levels](./orchestration/ORCHESTRATION_LEVELS.md), [The War Room](./orchestration/WAR_ROOM.md), [Game Master Guide](./orchestration/GAME_MASTER_GUIDE.md), and [Party Roles](./orchestration/PARTY_ROLES.md) documents.)_

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

## The CLI-Driven Workflow

The orchestration is designed to be initiated and managed via a set of CLI commands, wrapping the agent sessions with necessary permissions (e.g., `--permissions read, write`).

1. **Initialization:** A user facing a complex task runs a command (e.g., `app-cli start-war-room`) to spin up a War Room session. This injects the project context and connects the user with the Game Creator.
2. **Brainstorming:** In the War Room, the user and the Game Creator define the task, party composition, and overarching goals. They generate a "quest folder" containing the base rules and parameters.
3. **Quest Execution:** Once prep is complete, the user runs a second command (e.g., `app-cli start-quest [quest-name]`) to spin up a new, parallel session for the **GM**. The GM performs final local setup (e.g., git branching), gets a final thumbs-up from the user, and begins orchestrating the Party.
4. **Autonomous Execution:** The GM manages the party autonomously. It should only ever interrupt the user if there is a massive blocker, if it needs critical clarification, or when the quest is fully completed.
5. **Parallel Management & Mid-Flight Adjustments:** While the GM session is ongoing, the user can return to the War Room session. There, they can consult the Game Creator or the Master of Spies to critique progress or push "in-flight" rule modifications to the active GM session without hard-stopping the workflow.

## User Experience Goals

- **Visual Party Composition:** A quirky, D&D-themed UI where users can see and interact with their starting party. The tool provides a powerful default setup out-of-the-box based on proven orchestration models.
- **Deep Customization:** Users can visually reconfigure the party to fit their specific needs:
  - **Add/Remove Members:** Remove existing roles (e.g., remove the Warlock if no code review is needed) or add custom, brand new roles we haven't even thought of.
  - **Tweak Personalities & Responsibilities:** Edit the traits, instructions, and focus areas for any class.
  - **Define Relationships:** Map out how agents interact (e.g., "The Warrior and Healer work cohesively together," or "The Warlock is highly skeptical of the Wizard").
  - **Rule Enforcement:** The UI enforces basic ground rules (e.g., a minimum of 2 party members) while allowing high flexibility.
- **Agent Targeting:** Before export, users specify their target AI platform (e.g., Gemini, Claude) to ensure the orchestration is formatted correctly for that specific ecosystem.
- **One-Click Export:** A "Generate My Party" button that generates and downloads a ZIP package containing the tailored orchestration files (rules, roles, GM guide) and the CLI wrapper needed to run the workflow locally.

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

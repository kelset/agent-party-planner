# Agent Orchestration Levels

The Agents Party relies on a 3-tier hierarchical structure inspired by a Dungeons & Dragons session. This separation of concerns allows for complex problem-solving by delegating tasks to specialized agents while maintaining strong coordination.

## 1. The War Room (Meta-Level)

- **Role:** The ultimate overseer and interface with the human user.
- **Responsibilities:**
  - Handles the highest level of orchestration and strategic direction.
  - Defines the overarching rules, scope, and constraints for the session.
  - Reviews the final outputs from the GM before presenting them to the user.
- **Meta-Roles:** Includes specialized agents like the **Game Creator** (planning), the **Bard** (narrative recaps), and the **Master of Spies** (real-time critique and rule adjustments). For full details, see [The War Room](./WAR_ROOM.md).
- **Analogy:** The group of players deciding which campaign to run and setting the house rules before the game begins.

## 2. The GM Session (Coordinator)

- **Role:** The Game Master (GM) acts as the project manager and coordinator.
- **Responsibilities:**
  - Receives quests (tasks) from the War Room.
  - Translates overarching goals into actionable phases.
  - Spawns Party Members (sub-agents) in the correct sequence.
  - Reads journals, evaluates results, and decides who to spawn next.
  - **Crucially:** The GM does _not_ do the work itself. It only coordinates, delegates, and reviews.
- **Analogy:** The Game Master running the session, describing the world, tracking the story, and asking the players "What do you do?"

## 3. The Party (Sub-Agents / Classes)

- **Role:** The specialized workers who execute the actual tasks.
- **Responsibilities:**
  - Each agent has a specific "Class" (e.g., Ranger, Wizard, Warrior) with unique traits, skills, and tools.
  - They perform focused tasks such as profiling, strategizing, coding, reviewing, or fixing issues.
  - They communicate asynchronously via shared and private journals.
  - They operate with distinct personalities and viewpoints, creating "constructive tension" to ensure high-quality outcomes (e.g., a reviewer challenging an implementer's code).
- **Analogy:** The player characters (Ranger, Wizard, etc.) using their specific abilities to overcome the challenges presented by the GM.

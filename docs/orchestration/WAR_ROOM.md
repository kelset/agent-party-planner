# The War Room

The **War Room** is the highest level of orchestration in the Agent Party Planner. It serves as the meta-level interface between the human user and the underlying execution layers (the GM Session and the Party).

In the War Room, you don't fight the battles—you plan the campaign, review the outcomes, and adjust the strategy.

## War Room Meta-Roles

To manage this complex responsibility, the War Room features three specialized meta-agents that the user can interact with. Each serves a distinct purpose in shaping the orchestration.

---

### 1. The Game Creator (The Architect)

**Role:** The primary interface and brainstorm partner.
**Responsibilities:**

- Talks directly with the user to outline the overarching goals and scope of the quests.
- Helps design the party composition (which classes to include or exclude).
- Sets the "house rules" and constraints that the Game Master (GM) and the Party must follow.
- Acts as the project lead, translating user intent into the initial parameters that spin up a GM Session.

---

### 2. The Bard (The Chronicler)

**Role:** The storyteller and end-of-quest reporter.
**Responsibilities:**

- Interacts _only_ at the end of a completed quest when the party returns to the War Room.
- Reads the shared `journal.md`, measurements, and other quest artifacts.
- Synthesizes the raw data, diffs, and agent interactions into a cohesive, engaging narrative recap.
- Translates technical achievements (or failures) into a digestible storyline so the user understands exactly what happened without having to read raw logs.

---

### 3. The Master of Spies (The Critic)

**Role:** The real-time analyst and system evaluator (inspired by Game of Thrones' Varys).
**Responsibilities:**

- Can be consulted at _any_ point during or after a quest (unlike the Bard, who only acts at the end).
- Critiques the current quest's progress and the Party's performance.
- Identifies inefficiencies in the orchestration (e.g., "The Warlock is blocking too often on trivial issues," or "The Ranger's telemetry isn't capturing the root cause").
- Proposes actionable changes to the rules, suggests adding or removing specific roles, or recommends disabling certain characters for specific quests to optimize the workflow.

---

## Operating the War Room

The War Room is designed to be the first point of entry for a complex task. It should be launched via a CLI wrapper that ensures the agent has the necessary permissions to read the codebase and write the initial orchestration files.

**Example Command:** `app-cli start-war-room`
_(This command should invoke the underlying LLM CLI with elevated permissions, e.g., `claude --permissions read, write` or its equivalent, ensuring the Game Creator can instantly begin scaffolding the quest folder)._

### Mid-Flight Rule Changes

Because the War Room session and the GM Session can run in parallel, the user can use the War Room to alter a quest while it is actively being executed by the GM.

To achieve "graceful interruption," when the **Master of Spies** or the Game Creator proposes a rule change, they do not interrupt the GM's terminal process directly. Instead, they write the new constraints to a shared file within the quest folder (e.g., `active-rules.md` or `war-room-directives.md`). The GM is instructed to read this file before every action it takes. By doing so, the GM naturally absorbs the new instructions on its next loop iteration without breaking the current workflow.

### Using Safety Pauses

There are moments when the GM will naturally pause (e.g., hitting a 36-hour Time-to-Live limit or running low on agent tokens). These forced pauses are the perfect moments for the user to return to the War Room. The user can consult with the Game Creator or the Master of Spies to assess the situation and push new rules to `active-rules.md` before telling the GM to resume. Additionally, if the War Room decides a quest is beyond saving, the user can execute an abort command (e.g., `app-cli abort-quest`) to signal the GM to hard-reset the workspace and terminate.

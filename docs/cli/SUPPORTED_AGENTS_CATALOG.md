# Supported Agents Catalog

This document tracks the CLI interfaces of the primary Agent ecosystems we support.
Because these tools frequently update their flags and usage patterns, this catalog serves as our reference to ensure the Throne Room CLI spawns them correctly.

## 1. Gemini CLI

- **Documentation:** [Gemini CLI Reference](https://geminicli.com/docs/cli/cli-reference/)
- **Command:** `gemini`
- **Interactive Initial Prompt:** `-i "prompt"` or `--prompt-interactive "prompt"` (Executes prompt and stays interactive).
- **Headless Prompt:** `-p "prompt"` or `--prompt "prompt"`
- **File/Context Injection:** Does _not_ have a `--system-prompt` flag. Context must be injected by reading the file into the initial prompt string (e.g., `-i "Act as Game Creator. Read this: $(cat .orchestration/throne_room/game-creator.md)"`).

## 2. Claude Code

- **Documentation:** [Claude Code Reference](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)
- **Command:** `claude`
- **Initial Prompt:** `-p "prompt"` or passed positionally `claude "prompt"`.
- **Context Injection:** Claude automatically looks for and reads `CLAUDE.md` in the root directory. To explicitly inject our Throne Room prompt, we likely need to pass it as the initial prompt string (e.g., `claude -p "Act as Game Creator. Here are your rules: $(cat .orchestration/throne_room/game-creator.md)"`).
- **Approvals:** Supports `--auto-approve` for bypassing confirmation prompts.

## 3. OpenAI / Codex

- **Documentation:** [Codex Docs](https://github.com/openai/codex/tree/main/docs)
- **Command:** `codex` (or `openai`)
- _(Needs detailed flag mapping once API is confirmed)_

---

## Sub-Agents & Agent Teams Implementation

Each AI CLI ecosystem approaches multi-agent orchestration slightly differently. Our meta-framework must account for these capabilities:

### Claude Code

Claude Code makes a distinct separation between **Subagents** (Hub-and-Spoke) and **Agent Teams** (Collaborative).

- **Subagents (Default):** _(See: [Claude Subagents](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#subagents))_ The main agent spawns short-lived, isolated subagents (often using smaller models like Haiku) for tasks like `explore` or `plan`. They cannot talk to each other and only report back to the main agent. This maps well to our standard **GM -> Party** model.
- **Agent Teams (`claude --team`):** _(See: [Claude Agent Teams](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview#agent-teams))_ A collaborative model where one agent acts as a Team Lead, creating a shared task list. Teammates can claim tasks, communicate directly with each other, and share findings without routing through the lead. This is ideal for highly complex, parallelized features but consumes significantly more tokens.

### Gemini CLI

The Gemini CLI implements specialized agents via two distinct mechanisms: **Skills** and **Subagents (Experimental)**.

- **Skills (`SKILL.md`):** _(See: [Gemini CLI Skills](https://geminicli.com/docs/core/skills))_ A skill is a package that extends the agent's capabilities. It defines _what_ the skill does, _when_ to trigger it, and _how_ to execute it via a `SKILL.md` file. Our exported `SKILL.md` acts as the overarching rulebook that the main Gemini process follows.
- **Subagents (Experimental):** _(See: [Gemini CLI Subagents](https://geminicli.com/docs/core/subagents/))_ A true multi-agent paradigm where specialized "expert" agents operate in separate context loops to save tokens.
  - **Invocation:** The main agent automatically routes tasks to subagents by "hiring" them as tools.
  - **Conventions:** Custom subagents are defined as Markdown files with YAML frontmatter in `.gemini/agents/*.md`. The frontmatter defines their role, tools, and model, while the body serves as their unique system prompt.
  - **Settings:** Must be explicitly enabled via `"experimental": { "enableAgents": true }` in `settings.json`.

### OpenAI / Codex

OpenAI Codex supports a native orchestrator paradigm via its **Multi-Agent (Experimental)** functionality.

- **Multi-Agents:** _(See: [Codex Multi-Agents](https://developers.openai.com/codex/multi-agent))_ Codex acts as a central orchestrator, automatically spinning up sub-agents to handle independent parts of a task in parallel. Once all finish, Codex consolidates the findings.
  - **Invocation:** Enabled via `/experimental` toggle in the CLI or by setting `multi_agent = true` in `~/.codex/config.toml`. Users can naturally prompt Codex to spawn agents, or use tools like `spawn_agents_on_csv` for massive parallelization.
  - **Conventions:** Role configs are stored in `.codex/config.toml` (e.g., under `[agents.reviewer]`), which map to individual `reviewer.toml` files containing unique developer instructions and tool boundaries. Our framework could map the Throne Room Party directly into these `.toml` files.

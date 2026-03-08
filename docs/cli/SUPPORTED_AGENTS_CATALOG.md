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

- **Subagents (Default):** The main agent spawns short-lived, isolated subagents (often using smaller models like Haiku) for tasks like `explore` or `plan`. They cannot talk to each other and only report back to the main agent. This maps well to our standard **GM -> Party** model.
- **Agent Teams (`claude --team`):** A collaborative model where one agent acts as a Team Lead, creating a shared task list. Teammates can claim tasks, communicate directly with each other, and share findings without routing through the lead. This is ideal for highly complex, parallelized features but consumes significantly more tokens.

### Gemini CLI

The Gemini CLI implements specialized agents via **Skills**.

- **Skills (`SKILL.md`):** A skill is a package that extends the agent's capabilities. It defines _what_ the skill does, _when_ to trigger it, and _how_ to execute it via a `SKILL.md` file.
- **Execution:** When the Gemini agent recognizes a need, it automatically triggers `activate_skill(skill_name="...")`. The instructions inside the activated `SKILL.md` become "expert procedural guidance" that overrides general defaults. Our exported `SKILL.md` acts as the overarching rulebook that the main Gemini process follows.

### OpenAI / Codex

- Currently, standard CLI wrappers for OpenAI/Codex generally operate as single-agent loops. Sub-agent spawning usually requires custom logic built into the tool execution layer (e.g. Swarm or AutoGen), rather than being a native CLI flag. Our `start-quest.sh` wrapper handles this by injecting the orchestrator prompt to force the single model to act as the GM, which then conceptually simulates sub-agents by addressing them in its output.

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

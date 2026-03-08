# Throne Room CLI Vision

## Core Idea

Create a standalone CLI tool (e.g., `npx throne-room`) that allows users to instantly spin up the "Agents Party" orchestration without needing to manually configure or download the package from the web UI.

The CLI acts as a meta-wrapper around existing AI CLIs (like `claude`, `gemini`, or `openai`).

## MVP Workflow

1. **Invocation:** `npx throne-room` (or with optional flag: `--platform [claude|gemini|openai]`)
2. **Platform Selection & Validation:**
   - If no platform is provided, the CLI presents an interactive picker.
   - It performs a quick `$PATH` check (e.g., `which claude`, `which gemini`) and displays a green tick (✅) or red cross (❌) next to each option indicating if the underlying tool is installed locally.
   - **Crucial Rule:** The CLI does _not_ install the tools via `npx` (e.g., it runs `claude`, not `npx @anthropic-ai/claude-code`). It expects the user to have the CLI globally installed.
3. **Initialization:**
   - The CLI bundles the default orchestration files (Throne Room rules, GM guide, Party roles).
   - It scaffolds a dedicated `.orchestration` or `quest-dir` directory for the session.
   - It automatically spawns the underlying AI CLI in that directory, injecting the **Game Creator** system prompt.
4. **The Session:** The user interacts with the Game Creator in the terminal to brainstorm and plan the quest.
5. **Handoff (The GM):** Once the plan is ready, the Game Creator instructs the user: _"Copy this command and run it in your target codebase: `npx throne-room start-quest --quest-dir /path/to/orchestration`"_
6. **Execution:** The second command spawns the GM session inside the codebase, injecting the GM system prompt and giving it the necessary permissions to read the quest rules and write to the codebase.

## Extensibility

- **Built-in Defaults:** By default, it uses the highly opinionated "proven party preset" with all of Simon Willison's agentic engineering patterns baked in.
- **Bring Your Own Party (BYOP):** Allow passing a flag like `--party ./my-custom-party.zip` to override the built-in defaults with an exported package generated from the web UI.

## Technical Approach (Draft)

- Build using TypeScript, compiled to a Node.js executable.
- Define a `bin` entry in `package.json`.
- Use a lightweight interactive prompt library (like `@clack/prompts` or `inquirer`) for the picker.
- Use `child_process.execSync` to check for CLI existence.
- Use `child_process.spawn(..., { stdio: 'inherit' })` to hand over terminal control to the native `claude` or `gemini` command.
- Publish to npm under a scoped or unique package name.

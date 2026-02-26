# Agent Project Guidelines: Agent Party Planner

## Overview

This project is an interactive web-based tool for configuring and exporting agent orchestration packages. It uses a D&D-inspired theme but is architected for theme-agnostic core logic.

## Tech Stack & Tooling

- **Runtime:** [Bun](https://bun.sh) (v1.3.9+)
- **Framework:** [Astro](https://astro.build) (v5.0+)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) (v4.0+)
- **Language:** TypeScript (Strict mode)

## Documentation Resources

Always consult these resources for technical decisions and API usage:

- **Astro AI Docs:** [https://docs.astro.build/llms.txt](https://docs.astro.build/llms.txt)
- **Bun AI Docs:** [https://bun.sh/llms.txt](https://bun.sh/llms.txt)
- **Tailwind CSS v4 Docs:** [https://tailwindcss.com/docs](https://tailwindcss.com/docs)

## Project Structure

- `/docs`: High-level planning (Vision, Architecture, Plan).

- `/src`: Application source code.
  - `/layouts`: Shared page layouts.

  - `/pages`: Route definitions.

  - `/styles`: Global and component-specific styles.

  - `/components`: UI components.

  - `/templates`: (Pending) Orchestration prompt templates.

  - `/core`: Logic for template generation and orchestration.

## Agent Instructions

1. **Context First:** Before making significant changes, read `docs/VISION.md`, `docs/ARCHITECTURE.md`, and `docs/INFRASTRUCTURE.md`.

2. **Standard Compliance:** Adhere to the latest Astro and Bun conventions.

3. **Commit Style:** Use short, task-focused, present-tense summaries.

4. **Testing & Quality:**
   - Leverage `bun test` for unit testing logic in the `/core` and `/templates` directories.

   - Run `bun run lint` and `bun run format` before finalizing changes.

5. **War Room Context:** Follow the hierarchy of War Room (Meta) -> GM Session -> Party (Sub-Agents).

6. **Types:** Maintain strict TypeScript typing. Avoid `any`.

7. **Visual Validation:** Leverage the [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/) to view the locally running site (e.g., via `bun dev`). Use it to verify UI changes, validate layouts, and ensure your code modifications behave correctly in the browser.

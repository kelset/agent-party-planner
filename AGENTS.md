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
  - `/core`: (Pending) Logic for template generation.

## Agent Instructions
1. **Context First:** Before making significant changes, read `docs/VISION.md` and `docs/ARCHITECTURE.md`.
2. **Standard Compliance:** Adhere to the latest Astro and Bun conventions as described in their `llms.txt` files.
3. **Commit Style:** Use short, task-focused, present-tense summaries (e.g., `add party builder component`, `fix tailwind config`).
4. **Testing:** Leverage `bun test` for unit testing logic in the `/core` and `/templates` directories.
5. **Types:** Maintain strict TypeScript typing. Avoid `any`.

# 🎲 Agents Party

[![Netlify Status](https://api.netlify.com/api/v1/badges/ae7c3a34-395a-4b4b-844d-8d48b1e4b5ea/deploy-status)](https://app.netlify.com/projects/agentsparty/deploys) ![Contributions Welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)
<a href="https://github.com/kelset?tab=followers">
<img alt="follow me on github" src="https://img.shields.io/github/followers/kelset?label=Follow%20%40kelset&style=social" />
</a>
<a href="https://bsky.app/profile/kelset.dev">
<img src="https://img.shields.io/badge/Bluesky-0285FF?logo=bluesky&logoColor=fff&style=flat" alt="Follow me on bsky" >
</a>

An interactive web-based tool to visually configure and export **Agent Orchestration** systems.

Inspired by Dungeons & Dragons, this tool allows you to assemble a "Party" of specialized AI agents, customize their roles, and export a ready-to-use orchestration package for platforms like Gemini and Claude.

## ✨ Features

- **The Tavern (UI):** A D&D-themed interface for party composition.
- **The Forge (Logic):** Platform-agnostic template engine that generates optimized prompts.
- **The Courier (Export):** Client-side ZIP generation for immediate use.
- **Multi-Platform Support:** Tailored exports for Gemini (SKILL.md) and Claude (Agent Teams).
- **Privacy First:** Entirely client-side logic—no data leaves your browser.

## 🛠️ Tech Stack

- **Runtime:** [Bun](https://bun.sh)
- **Framework:** [Astro v5](https://astro.build)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com)
- **Language:** TypeScript (Strict)
- **Linting:** ESLint 10 + Prettier

## 🤖 Agent Integration

This project is built to be easily navigated and developed by AI agents. We strongly encourage using the [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp/) to allow the agent to visually verify and validate its work in the browser during development.

## 🚀 Getting Started

```bash
# Install dependencies
bun install

# Start the development server
bun dev

# Run tests
bun test

# Lint & Format
bun run lint
bun run format
```

## 📂 Project Structure

- `src/core/`: Core orchestration logic and template merging.
- `src/templates/`: Base prompts for the Throne Room, GM, and Classes.
- `src/themes/`: Visual styling and theme-specific assets.
- `docs/`: Product vision, architecture, and infrastructure plans.

## 📜 Documentation

- [Vision](./docs/VISION.md)
- [Architecture](./docs/ARCHITECTURE.md)
- [Infrastructure](./docs/INFRASTRUCTURE.md)
- [Development Plan](./docs/PLAN.md)

### Orchestration

- [Orchestration Levels](./docs/orchestration/ORCHESTRATION_LEVELS.md)
- [The Throne Room](./docs/orchestration/THRONE_ROOM.md)
- [Game Master Guide](./docs/orchestration/GAME_MASTER_GUIDE.md)
- [Party Roles](./docs/orchestration/PARTY_ROLES.md)

---

Made with agentic nerdism by [kelset](https://github.com/kelset).

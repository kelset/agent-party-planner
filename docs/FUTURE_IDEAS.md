# Future Ideas & Backlog

This document tracks ideas, features, and technical improvements that have been discussed but are currently postponed or deprioritized.

## Theming & UI

- **Theme Swapping / Reskinning:** Build a theme-switcher UI and define alternative palettes to leverage the agnostic architecture (e.g., Sci-Fi/Star Trek theme instead of D&D).
- **Pixel Art Font:** Introduce a web-safe pixel art font (like 'Press Start 2P' or 'VT323') for main headers to enhance the retro RPG aesthetic.

## Tech & Ecosystem

- **SSR for Dynamic OG Images:** Currently, OG images are pre-rendered at build time for the default party. To support unique, on-the-fly generated OG images for every custom shared URL, the project should be migrated to SSR (Server-Side Rendering) mode.
- **Expand Platform Targets:** Add more explicit platform adapters for other AI ecosystems (e.g., Copilot, Codex, etc.) with specific multi-agent orchestration quirks.

## Deprioritized / Scrapped

- **Analytics & Observability:** Client-side error boundaries (Sentry) and tracking (Umami/Plausible). Decided it's not worth the overhead for a small frontend project.
- **Sponsor Button:** "Buy Me a Coffee" integration is on hold to avoid company policy complexities and low usage.

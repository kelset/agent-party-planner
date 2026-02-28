# Architecture: Agent Party Planner

## Design Principles

- **Theme/Logic Separation:** Decouple the visual presentation (D&D, Sci-Fi, etc.) from the underlying agent template logic.
- **Variable-Driven Templates:** Use a templating engine to inject user configurations (class roles, names, specific rules) into pre-defined agent prompts.
- **Static First, Dynamic When Needed:** Leverage a fast modern stack (proposed: Bun + Astro) to deliver a polished, snappy UI with minimal overhead.

## Components

1. **Frontend (The Tavern):**
   - Interactive, quirky D&D-themed UI for selecting, configuring, and modifying the "Party".
   - Logic to handle party constraints (e.g., minimum 2 members), deep role customization, and inter-agent relationship mapping.
   - State management to track the composition and customizations.
   - Theme provider/layer to allow for future visual swaps.

2. **Template Engine (The Forge):**
   - A collection of base prompts and rules for the War Room, GM, and Classes.
   - **Platform Adapters:** Logic to format the orchestration according to the target agent (Gemini, Claude, etc.).
   - Logic to merge user-provided variables into these templates.

3. **Export Service (The Courier):**
   - Packages the generated files into a standardized folder structure.
   - Compresses the structure into a ZIP file for client-side download.

## Technical Considerations

### State Management

- **Local-First:** Use browser `localStorage` or `IndexedDB` to persist party configurations between sessions without requiring a backend database.
- **URL-Based State:** Consider encoding the party configuration in the URL (Base64 or compressed) to allow users to share their "Party Composition" easily.

### Logic Distribution

- **Client-Side Heavy:** To keep Netlify costs at zero, the "Forge" and "Courier" will operate entirely in the browser using libraries like `jszip`.
- **Static Site Generation (SSG):** Astro will pre-render all UI components, ensuring fast initial loads and low server overhead.

### Observability & Error Logging

- **Low-Cost Analytics:** Use a privacy-focused, lightweight analytics tool (e.g., Umami or Plausible) or stick to Netlify's built-in analytics.
- **Error Tracking:** Implement simple error boundaries and potentially use a free tier of a service like Sentry or LogRocket if complex client-side errors occur frequently.

### Theming System

- **Tailwind v4 CSS Variables:** Leverage the new Tailwind version's CSS variable-first approach to allow "skins" to be applied by simply swapping a data-theme attribute on the root element.

## Folder Structure (Internal)

```text
src/
├── components/      # UI components (Party slots, Class cards, etc.)
├── core/            # Logic for merging templates and generating the package
├── layouts/         # Base page layouts
├── pages/           # Astro page routes
├── styles/          # Global and component-specific Tailwind styles
└── templates/       # Base agent prompts and orchestration rules
```

## Final Stack

- **Runtime:** Bun (for speed and modern DX).
- **Framework:** Astro 5 (for content/template-focused sites with high performance).
- **Styling:** Tailwind CSS v4 (using CSS variable-first approach).
- **Interactivity:** Preact (lightweight reactive components for the party builder).
- **State:** LZ-String compressed URL state + LocalStorage persistence.
- **Export:** Client-side JSZip generation.

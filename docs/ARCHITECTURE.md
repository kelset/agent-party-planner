# Architecture: Agent Party Planner

## Design Principles
- **Theme/Logic Separation:** Decouple the visual presentation (D&D, Sci-Fi, etc.) from the underlying agent template logic.
- **Variable-Driven Templates:** Use a templating engine to inject user configurations (class roles, names, specific rules) into pre-defined agent prompts.
- **Static First, Dynamic When Needed:** Leverage a fast modern stack (proposed: Bun + Astro) to deliver a polished, snappy UI with minimal overhead.

## Components
1. **Frontend (The Tavern):**
   - Interactive UI for selecting and configuring the "Party".
   - State management to track the composition and customizations.
   - Theme provider/layer to allow for future visual swaps.

2. **Template Engine (The Forge):**
   - A collection of base prompts and rules for the Game Room, GM, and Classes.
   - Logic to merge user-provided variables into these templates.

3. **Export Service (The Courier):**
   - Packages the generated files into a standardized folder structure.
   - Compresses the structure into a ZIP file for client-side download.

## Folder Structure (Internal)
```text
src/
├── themes/          # Visual styles, icons, and theme-specific copy
│   └── dnd/
├── templates/       # Base agent prompts and orchestration rules
├── core/            # Logic for merging templates and generating the package
└── components/      # UI components (Party slots, Class cards, etc.)
```

## Proposed Stack
- **Runtime:** Bun (for speed and modern DX).
- **Framework:** Astro (excellent for content/template-focused sites with optional interactivity).
- **Styling:** Tailwind CSS (for easy theme variables and rapid UI development).
- **Interactivity:** React or Vanilla JS/HTMX (depending on the complexity of the party builder).

# Visual Identity & Style Guide

## Overview

The "Agent Party Planner" visual identity is a blend of **Dungeons & Dragons** fantasy themes and **retro-brutalist / 16-bit RPG pixel art**. 

This aesthetic breaks away from standard, ultra-sleek, rounded modern web interfaces, instead opting for chunky, tactile, and highly distinct UI elements. The goal is to make the user feel like they are interacting with physical game components—parchment scrolls, thick wooden signs, and rigid character cards.

## Core Aesthetic Principles

1. **Retro Brutalism:** 
   - Strict adherence to sharp corners or very subtle rounding (`rounded-sm` or `rounded` max).
   - Thick, high-contrast borders (e.g., `border-[3px] border-[#2c1e16]`).
   - Hard, un-blurred drop shadows (e.g., `shadow-[4px_4px_0_#2c1e16]`) to create "pop-out" 3D effects.
   - Elements should feel like physical objects placed on top of one another.

2. **Tactile Interactivity:**
   - Active states should visually "press down" into the page (e.g., `active:translate-x-[4px] active:translate-y-[4px] active:shadow-[0_0_0_#2c1e16]`).
   - Hover states should slightly lift or brighten, but remain rigid.

3. **Fantasy Materials:**
   - **Parchment:** Warm, aged paper tones for readable areas (`#f4e9d8`, `#e8dcb8`).
   - **Wood & Leather:** Rich, dark browns for borders, rollers, and structural elements (`#2c1e16`, `#5c4033`, `#af8d6b`).
   - **Metals:** Accent colors in Gold/Bronze (`#d97706`), Crimson/Blood Red (`#b93838`, `#8c2a2a`), and Emerald/Jade.

## Typography

To maintain readability while enforcing the theme, we use a dual-font approach:

- **Headers & Display Text (Theme):**
  - Should evoke a retro or pixelated feel.
  - Currently leaning on `font-family: 'monospace'` or system-default serif/retro fallbacks combined with `font-black`, `uppercase`, and `tracking-widest`.
  - *Future consideration: Introduce a web-safe pixel art font (e.g., 'Press Start 2P', 'VT323', or a custom readable pixel font) specifically for main headers like "Assemble Your Party" or "Seal The Pact".*

- **Body Text (Readability):**
  - `font-family: 'Inter', system-ui, sans-serif`
  - High contrast against the parchment background. We avoid pure black, using deep espresso browns (e.g., `#2c1e16` or `#3a2822`) to soften the contrast slightly while maintaining theme.

## Color Palette

### The Tavern (Backgrounds & Void)
- `--color-tavern-950`: `#0a0908` (Deep, almost black background)
- `--color-tavern-900`: `#1a1614` (Dark shadow/panel background)
- `--color-tavern-800`: `#2c2420` (Secondary structural background)

### The Scroll (Parchments)
- `Light Parchment`: `#f4e9d8` or `#fffcf5` (Inputs, active areas)
- `Base Parchment`: `#e8dcb8` (Buttons, secondary cards)
- `Aged Parchment`: `#c8a98a` / `#af8d6b` (Outer scroll bodies, structural UI)

### The Ink & Structure (Borders & Text)
- `Deep Ink / Border`: `#2c1e16` (Primary text on parchment, primary borders)
- `Faded Ink`: `#4a3424` / `#5c4033` (Secondary text)

### Accent Colors (Gems & Magic)
- `Crimson (Action)`: `#b93838` (Hover: `#a12e2e`, Active/Dark: `#8c2a2a`)
- `Gold (Warning/Accent)`: `#d97706` / `#fbbf24`
- `Emerald (Success/Ranger)`: `#10b981`
- `Purple (Magic/Wizard)`: `#8b5cf6`

## UI Component Guidelines

### Buttons
- Must feature a thick border (`border-[3px] border-[#2c1e16]`).
- Must have a hard drop shadow (`shadow-[4px_4px_0_#2c1e16]`).
- On `:active`, they must translate down and right to "consume" the shadow, creating a physical button press effect.

### Cards & Panels
- Replicate physical materials (scrolls, boards).
- Avoid soft, diffuse shadows (`shadow-lg`). Instead, use sharp drop shadows or thick borders.
- Inputs (`<input>`, `<select>`) should have inner shadows (`shadow-inner`) to look recessed into the parchment.

### Background Patterns
- Use CSS gradients to create subtle grid patterns (e.g., a 48x48px grid on parchment) or scanlines to emulate old maps or retro screens.

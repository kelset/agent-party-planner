# SEO Investigation & Improvement Plan

This document outlines the findings and strategy for improving the SEO of the **Agents Party** website.

## Phase 1: General SEO Best Practices

These are baseline improvements that should be present in any modern web project.

### 1. Robust Metadata
The current `Layout.astro` is minimal. We need to add:
- **Meta Description:** A concise summary of the tool for search results.
- **Open Graph (OG) Tags:** For better presentation when shared on social media (Facebook, Discord, LinkedIn).
- **Twitter Cards:** Tailored metadata for X/Twitter.
- **Canonical URLs:** To prevent duplicate content issues.
- **Favicon & Theme Colors:** Proper manifest and icons for mobile/PWA feel.

### 2. Technical SEO
- **Sitemap:** Automatically generate a `sitemap-index.xml` to help crawlers discover all pages.
- **Robots.txt:** A file to guide crawlers on what to index.
- **Site URL:** Ensure the `site` property in `astro.config.mjs` is correctly set (Done: `https://agentsparty.dev`).

## Phase 2: Tool & Framework Specifics (Astro)

Astro provides unique advantages that we should leverage.

### 1. JSON-LD Structured Data
Adding `WebApplication` and `FAQ` schema helps Google understand that this is a tool, not just a blog post. This can lead to "Rich Snippets" in search results.

### 2. Semantic Content for Crawlers
Interactive tools often suffer from "Thin Content" because much of the value is hidden behind user interaction.
- **Strategy:** Add a "How it Works" or "Frequently Asked Questions" section in plain HTML below the interactive `TavernUI`. This provides the "textual weight" search engines need.

### 3. Core Web Vitals (2025 Focus)
- **INP (Interaction to Next Paint):** Ensure the Preact components don't block the main thread.
- **LCP (Largest Contentful Paint):** Optimize the Hero banner image.

## Phase 3: Actionable Checklist

### Immediate Actions
- [x] Install `@astrojs/sitemap`.
- [x] Create `public/robots.txt`.
- [x] Refactor `Layout.astro` to accept SEO props (`description`, `ogImage`, etc.).
- [x] Add meta tags and OG tags to `Layout.astro`.

### Content Actions
- [x] Add a "How It Works" section to `index.astro`.
- [x] Add `WebApplication` schema to the home page.
- [x] Add `FAQ` schema to the Compendium.

### Advanced (Future)
- [x] Dynamic OG image generation: Implemented via Satori and Resvg. It automatically generates a "Party Card" preview when a `?party=` link is shared.
- [x] AI-crawling optimization: Added concise "Direct Answer" snippets (1-2 sentences) at the start of key sections to help AI models cite the tool.
- [x] LCP Optimization: Verified that the Hero Banner is CSS-based, ensuring fast load times.

## Note on Base URL sharing
Sharing the base `agentsparty.dev` will use a high-quality static fallback. We have updated the home page to also leverage the dynamic generator with a default "Assemble Your Party" preview for maximum visual impact even without a shared state.

## Accessibility & Final Audit
A Lighthouse audit was performed on March 14, 2026, with the following results:
- **SEO:** 92/100
- **Accessibility:** 88/100 (Improved to 95+ after fixing missing ARIA labels and alt text)
- **Best Practices:** 100/100

### Improvements made based on audit:
- Added `aria-label` to all interactive icons (GitHub, Share, Edit Member).
- Added `aria-hidden="true"` to decorative SVGs inside buttons.
- Ensured all role portraits have descriptive `alt` text.
- Improved H1/H2 hierarchy on the Compendium page.

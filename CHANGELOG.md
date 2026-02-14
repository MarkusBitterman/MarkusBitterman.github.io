# Changelog

All notable changes to this project will be documented in this file.

## [1.3.0] - 2026-02-14

### v1.3.0 — Added

- **NP50 Theme** — "Nintendo Power No. 50" visual identity
  - 13-color palette sampled from July 1993 Nintendo Power magazine (Link's Awakening issue)
  - 10 composable CSS layers: tokens, paper backdrop, stripe accent, hero poster,
    paper cutout boxes, ink underline links, navbar masthead, CSS seal badge,
    utility classes, footer
  - Modern CSS techniques: `color-mix(in oklab)`, layered gradients, `mix-blend-mode`,
    `repeating-linear-gradient` patterns, `conic-gradient` seal — zero image assets
  - Tuning knobs via CSS custom properties (`--np-paper-contrast`, `--np-ink-bleed`, `--np-pop`)
  - `prefers-reduced-motion` support for all animations
  - New `.np-hero`, `.np-stripes`, `.np-seal` utility classes
  - Blog post documenting the inspiration and implementation

- **GLSL Shader Hero Backgrounds** — WebGL2 animated backgrounds for every hero section
  - 6 unique fragment shaders, one per page, themed to NP50 palette colors:
    - Home: "Dungeon Entrance" — dark brick room with flickering torches and rupee glint
    - About: "Koholint Ocean" — four-shade NES water with chunky wave bands
    - Portfolio: "Lost Woods Overworld" — top-down tile map scrolling the Lost Woods solution (N,W,S,W)
    - Now: "Time Gate" — Chrono Trigger-inspired swirling blue vortex with radial energy
    - Toolbox: "Diagnostic Screen" — subdued grid of colored blocks, slow cycling, 80% muted
    - Blog: "Scroll Text" — NES RPG text box with amber characters, occasional red/blue highlights
  - Zero dependencies — vanilla JS WebGL2 engine (`shader-hero.js`)
  - Retro NES aesthetic: 0.35× DPR chunky pixels, `image-rendering: pixelated`, CSS scanline overlay
  - Shared GLSL retro toolkit: scanlines, RF static, color quantization, horizontal jitter
  - IntersectionObserver pauses rendering when hero is off-screen (battery-friendly)
  - Full `prefers-reduced-motion` support: JS skips init, CSS hides canvas
  - Graceful fallback: NP50 CSS gradient background remains visible if WebGL2 unavailable
  - Driven by `heroShader` front matter key — fully opt-in per page
  - Flashing-light safety: Toolbox shader deliberately mutes 80% of blocks

- **VS Code Tasks** - Comprehensive task runner configuration (`.vscode/tasks.json`)
  - Build & Validation: Verify Build, Build All, Build Eleventy, Build Sass, Check Output
  - Development Server: Start, Stop, Restart, Status monitoring
  - Maintenance: Clean Build, Clean All, Reinstall, Install Dependencies
  - Diagnostics: Project Stats, List Pages, Deploy Check
  - Default keyboard shortcuts: `Ctrl+Shift+B` for Build All
  - Documented in README.md and GETTING_STARTED.md

### v1.3.0 — Changed

- **Upgraded Bulma** 0.9.4 → 1.0.4
  - Migrated to modern Sass syntax using `@use "sass:color"`
  - Changed import path from `bulma.sass` to `bulma/sass` (new structure)
  - Replaced deprecated `darken()` with `color.adjust()`
  - Reduced Sass deprecation warnings from 256+ to 6 (only Bulma internal if-function warnings remain)
  - Build time improved slightly

### v1.3.0 — MVC Architecture Refactor

Restored proper **Model-View-Controller separation** across the entire site and consolidated Playground + Sandbox into a single **Toolbox** page with real interactive client-side utilities.

#### Playground + Sandbox → Toolbox

- **Removed** `playground.md`, `sandbox.md`, `layouts/playground.njk`, `layouts/sandbox.njk`
- **Created** `toolbox.md` + `layouts/toolbox.njk` — a single page for small interactive client-side utilities
- **Created** `src/js/keygen.js` — Random Key & Password Generator
  - 10 generator types: Memorable Passphrase, PIN, Strong (16-char), Fort Knox (32-char), Alphanumeric, 128-bit Hex, 256-bit Hex, Base64 Secret, UUID v4, API Key Style
  - Uses `crypto.getRandomValues()` — 100% client-side, no data leaves the browser
  - Click-to-copy with visual feedback, keyboard shortcut (R) to regenerate
  - BIP39-inspired word list for memorable passphrases
- **Coming Soon** section: Dice Roller, Scratch Pad, Color Picker, Hash Generator
- Updated navbar: replaced Playground/Sandbox dropdown with direct Toolbox link
- Updated homepage: merged two cards into single Toolbox card
- Updated all cross-references (portfolio, now, welcome post, README, base layout meta)
- Added `src/js` passthrough copy to Eleventy config

#### New Page Layouts (View Layer)

- Created `layouts/home.njk` — Hero, navigation cards loop, clone-repo CTA, quickstart steps
- Created `layouts/about.njk` — Peer support section, dev work projects, tech stack tags, dev environment table, thread notification, site goals, finger file, contact links
- Created `layouts/portfolio.njk` — Project cards with dynamic tags/features/links, skills groups, philosophy notification
- Created `layouts/now.njk` — Current projects media list, day job, learning topics, writing list, goals (short/medium/long term), tools table, mind note
- Created `layouts/toolbox.njk` — Tool navigation, keygen interactive section, coming-soon grid, philosophy, CTA

#### Refactored Content Files (Model Layer)

- **`index.md`** — Replaced ~160 lines of inline HTML with structured YAML front matter (`cards`, `quickstart` arrays) + 2-line Markdown body
- **`about.md`** — Replaced ~270 lines of inline HTML with structured front matter (`peerSupport`, `devWork`, `stack`, `devEnv`, `thread`, `siteGoals`, `fingerFile`, `contactLinks`) + Markdown intro
- **`portfolio.md`** — Replaced ~200 lines of inline HTML with structured front matter (`projects` with tags/features/links, `skills` groups, `philosophy`) + Markdown intro
- **`now.md`** — Replaced ~190 lines of inline HTML with structured front matter (`currentProjects`, `dayJob`, `learning`, `writing`, `goals`, `tools`, `mindNote`) + Markdown intro
- **`toolbox.md`** — New page with front matter (`tools`, `comingSoon`, `philosophy`) + Markdown intro

#### Architecture

- **Model**: YAML front matter in `.md` files defines all page data (arrays, objects, strings)
- **View**: Nunjucks `.njk` layouts handle all Bulma HTML structure, iterating over front matter data
- **Controller**: Eleventy's data cascade and template engine connects Model to View
- All 6 blog posts remain unchanged — they already followed the correct pattern (front matter + pure Markdown prose)
- `blog.njk` unchanged — already a `.njk` file with no content separation issues

### v1.3.0 — Build

- Verified: 12 files output (down from 13 — two pages merged into one), 6 blog posts, 0 errors
- 1 JS file copied via passthrough (`keygen.js`)
- Sass deprecation warnings remain (Bulma 1.0.4's internal `if()` function syntax) — non-blocking

## [1.2.0] - 2026-02-13

### v1.2.0 — Added

#### New Projects

- **Corridor Peer Pathways** — Added to Portfolio and Now pages. Open-source peer support resource for Eastern Iowa's I-380 Corridor with 70+ verified organizations and "Golden Nuggets" frameworks.
- **HALLway OS** — Added to Portfolio and Now pages. NixOS-based OS stack with role-based user management, ZFS on LUKS, Hyprland desktop, built on Atari VCS 800.
- **socialize.sh** — Added to Portfolio and Now pages. Early-stage exploration of social media depth features, portrait metadata, and platform image processing.

#### New Blog Posts

- `introducing-corridor-peer-pathways.md` — Introducing the peer support resource, open-source philosophy, Golden Nuggets concept
- `hallway-os-your-digital-life.md` — Introducing HALLway OS, NixOS foundation, role-based users, Project Bible vision
- `socialize-sh-whats-in-your-selfies.md` — Introducing depth map exploration, image metadata research, privacy questions

### v1.2.0 — Changed

#### About Page

- Rewrote to reflect peer support specialist background alongside developer identity
- Added Shelter House Iowa employment, Fairweather Lodge graduate status
- Added Corridor Peer Pathways independent practice
- Expanded tech stack to include NixOS, Nix Flakes, Home Manager, agenix, ZFS
- Added "The Thread That Connects It All" section bridging peer support and open-source values
- Added hardware details (Atari VCS 800, Hyprland/Wayland)

#### Portfolio Page

- Replaced placeholder "Your Next Project" card with 3 real project cards
- Reordered to lead with Corridor Peer Pathways and HALLway OS
- Updated skills section to reflect NixOS, Nix Flakes, peer support, privacy, and image forensics
- Updated philosophy section to connect peer support and open-source values
- Each project card links to both its blog post and GitHub repository

#### Now Page

- Added all 3 new projects with media-object layouts and status tags
- Added "Day Job" section for Shelter House Iowa context
- Updated Learning & Exploring with NixOS/Flakes, privacy infrastructure, image metadata, peer support frameworks
- Updated Goals to reflect current project milestones
- Expanded Tools table with Hyprland, Nix Flakes, ZFS, agenix details

## [1.1.0] - 2026-02-13

### v1.1.0 — Fixed

#### Bulma Styling Overhaul

- Converted all content pages to use `layouts/base.njk` with proper inline Bulma HTML
- Replaced plain Markdown pages with rich Bulma component layouts (cards, boxes, notifications, tables, tags, media objects, levels)
- Removed duplicate hero sections on index and blog pages
- Each page now has a unique hero color for visual identity (primary, info, link, success, warning, danger, dark)
- Fixed blog post listing — `collections.posts.length` replaced with Nunjucks `| length` filter
- Added `| reverse` to blog post loop to show newest posts first
- Blog post cards now include icons, better tag styling, and proper read-more buttons

#### v1.1.0 — Developer Experience

- Added `shell.nix` for NixOS/Nix users — provides Node.js 20, Dart Sass, and Git out of the box
- Added `.editorconfig` for consistent formatting across editors
- Added `.vscode/extensions.json` with recommended extensions for the project
- Added `.vscode/settings.json` with workspace-specific settings (Nunjucks support, Emmet, formatting)
- Updated `.gitignore` to track `.vscode/` workspace files and ignore Nix artifacts
- Updated Node.js version requirement from v14 to v18

#### v1.1.0 — Documentation

- Updated `README.md` with NixOS/Nix quick-start instructions and shell.nix usage
- Updated `README.md` project structure to include new workspace files
- Updated `README.md` GitHub Actions section to reference the existing workflow
- Updated `GETTING_STARTED.md` with Nix installation path and corrected Node version
- Updated Now page date to February 2026

## [1.0.0] - 2026-01-28

### v1.0.0 — Added

#### Core Infrastructure

- Eleventy (11ty) static site generator configuration
- Nunjucks templating engine setup
- Bulma CSS framework integration
- Sass preprocessing pipeline
- GitHub Actions deployment workflow
- Comprehensive `.gitignore` for clean repository

#### v1.0.0 — Templates & Layouts

- `base.njk` - Base HTML layout with meta tags and Font Awesome
- `page.njk` - Layout for static pages with optional hero section
- `post.njk` - Layout for blog posts with metadata and navigation
- `navbar.njk` - Responsive navigation with mobile toggle
- `footer.njk` - Site footer with links and copyright
- `hero.njk` - Customizable hero section component

#### v1.0.0 — Content Pages

- **Home** (`index.md`) - Landing page with site overview and quick start guide
- **About** (`about.md`) - Personal bio and background
- **Portfolio** (`portfolio.md`) - Projects showcase
- **Now** (`now.md`) - Current status page (inspired by /now movement)
- **Playground** (`playground.md`) - Interactive experiments index
- **Sandbox** (`sandbox.md`) - Work-in-progress experiments index
- **Blog** (`blog.njk`) - Blog index with post listings

#### v1.0.0 — Blog Posts

- "Welcome to the New Site!" - Introduction and site overview
- "Building with Eleventy, Bulma, and Sass" - Technical deep dive
- "The Finger File Tradition and Modern Devlogs" - Historical context and philosophy

#### v1.0.0 — Styling

- Custom Sass configuration with Bulma variable overrides
- Responsive design with Bulma's grid system
- Custom styling for:
  - Post content formatting
  - Card hover effects with reduced motion support
  - Navbar enhancements
  - Footer styling
  - Hero gradient backgrounds

#### v1.0.0 — Documentation

- **README.md** - Comprehensive project documentation
  - Tech stack overview
  - Quick start guide
  - Project structure explanation
  - Content creation guides
  - Deployment instructions
  - Learning resources
- **GETTING_STARTED.md** - Detailed beginner-friendly guide
  - Prerequisites and verification
  - Step-by-step installation
  - Directory structure explanation
  - Creating pages and posts
  - Customizing styles
  - Troubleshooting section

#### v1.0.0 — Build System

- npm scripts for development and production
  - `npm start` - Development server with live reload
  - `npm run build` - Production build (Sass + Eleventy)
  - `npm run build:sass` - Compile Sass to CSS
  - `npm run build:eleventy` - Generate static HTML
  - `npm run clean` - Clean output directory

#### v1.0.0 — Features

- Post collection with automatic sorting by date
- Date formatting filters (readable and ISO formats)
- Excerpt generation for post previews
- Current year filter for dynamic copyright
- Passthrough copying for static assets and CNAME
- Markdown-first content workflow

#### v1.0.0 — Security

- `rel="noopener noreferrer"` on all external links
- Subresource Integrity (SRI) hash for Font Awesome CDN
- Server-side year generation (no client-side DOM manipulation)
- CodeQL security scanning with 0 alerts

#### v1.0.0 — Accessibility

- `prefers-reduced-motion` media query support
- Semantic HTML structure
- Responsive mobile-first design
- Clear navigation hierarchy
- Proper ARIA labels

#### v1.0.0 — Deployment

- GitHub Actions workflow for automated builds
- Deploys to GitHub Pages on push to main/master
- Build artifact upload for Pages deployment

### v1.0.0 — Philosophy & Design Principles

- **Inspectable** - All code is visible and understandable
- **Forkable** - Designed to be cloned and customized
- **Learnable** - Documentation by example
- **Simple** - No over-engineering or unnecessary complexity
- **Living** - Meant to evolve with the creator

### v1.0.0 — Inspired By

- Classic Unix `.plan` files (especially John Carmack's)
- The `/now` page movement by Derek Sivers
- "Working in public" and "learning in public" movements
- JAMstack architecture principles

---

## Future Plans

Potential additions for future versions:

- [ ] RSS feed for blog posts
- [ ] Search functionality
- [ ] Tag-based filtering
- [ ] Dark mode toggle
- [ ] Syntax highlighting for code blocks
- [ ] Social media sharing buttons
- [ ] Comment system integration
- [ ] Analytics integration (privacy-focused)
- [ ] Performance optimizations
- [ ] More interactive playground demos

---

*This changelog follows [Keep a Changelog](https://keepachangelog.com/) format.*

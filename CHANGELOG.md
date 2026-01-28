# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2026-01-28

### Added - Initial Site Setup

#### Core Infrastructure
- Eleventy (11ty) static site generator configuration
- Nunjucks templating engine setup
- Bulma CSS framework integration
- Sass preprocessing pipeline
- GitHub Actions deployment workflow
- Comprehensive `.gitignore` for clean repository

#### Templates & Layouts
- `base.njk` - Base HTML layout with meta tags and Font Awesome
- `page.njk` - Layout for static pages with optional hero section
- `post.njk` - Layout for blog posts with metadata and navigation
- `navbar.njk` - Responsive navigation with mobile toggle
- `footer.njk` - Site footer with links and copyright
- `hero.njk` - Customizable hero section component

#### Content Pages
- **Home** (`index.md`) - Landing page with site overview and quick start guide
- **About** (`about.md`) - Personal bio and background
- **Portfolio** (`portfolio.md`) - Projects showcase
- **Now** (`now.md`) - Current status page (inspired by /now movement)
- **Playground** (`playground.md`) - Interactive experiments index
- **Sandbox** (`sandbox.md`) - Work-in-progress experiments index
- **Blog** (`blog.njk`) - Blog index with post listings

#### Blog Posts
- "Welcome to the New Site!" - Introduction and site overview
- "Building with Eleventy, Bulma, and Sass" - Technical deep dive
- "The Finger File Tradition and Modern Devlogs" - Historical context and philosophy

#### Styling
- Custom Sass configuration with Bulma variable overrides
- Responsive design with Bulma's grid system
- Custom styling for:
  - Post content formatting
  - Card hover effects with reduced motion support
  - Navbar enhancements
  - Footer styling
  - Hero gradient backgrounds

#### Documentation
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

#### Build System
- npm scripts for development and production
  - `npm start` - Development server with live reload
  - `npm run build` - Production build (Sass + Eleventy)
  - `npm run build:sass` - Compile Sass to CSS
  - `npm run build:eleventy` - Generate static HTML
  - `npm run clean` - Clean output directory

#### Features
- Post collection with automatic sorting by date
- Date formatting filters (readable and ISO formats)
- Excerpt generation for post previews
- Current year filter for dynamic copyright
- Passthrough copying for static assets and CNAME
- Markdown-first content workflow

#### Security
- `rel="noopener noreferrer"` on all external links
- Subresource Integrity (SRI) hash for Font Awesome CDN
- Server-side year generation (no client-side DOM manipulation)
- CodeQL security scanning with 0 alerts

#### Accessibility
- `prefers-reduced-motion` media query support
- Semantic HTML structure
- Responsive mobile-first design
- Clear navigation hierarchy
- Proper ARIA labels

#### Deployment
- GitHub Actions workflow for automated builds
- Deploys to GitHub Pages on push to main/master
- Build artifact upload for Pages deployment

### Philosophy & Design Principles
- **Inspectable** - All code is visible and understandable
- **Forkable** - Designed to be cloned and customized
- **Learnable** - Documentation by example
- **Simple** - No over-engineering or unnecessary complexity
- **Living** - Meant to evolve with the creator

### Inspired By
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

# AI Agent Instructions for MarkusBitterman.github.io

This document provides guidance for AI coding agents working on this project. It captures the architectural decisions, development philosophy, and technical context established during the project's evolution.

## 🎯 Project Overview

**MarkusBitterman.github.io** is an Eleventy-powered personal portfolio and blog featuring a retro Nintendo Power magazine aesthetic (NP50 theme) and WebGL2 GLSL shader backgrounds. The project balances personal expression with open-source educational value.

### Core Technologies

- **Eleventy 2.0.1**: Static site generator
- **Nunjucks**: Template engine
- **Bulma 1.0.4**: CSS framework
- **Sass**: Styling with modern syntax
- **WebGL2**: GLSL fragment shaders for animated hero backgrounds
- **Google Fonts**: Coral Pixels, Spectral, Sixtyfour Convergence, Atkinson Hyperlegible

## 🏗️ Architecture Principles

### MVC Separation (Critical)

This project follows strict Model-View-Controller separation:

- **Model**: YAML front matter in `.md` files (data structure only)
- **View**: Nunjucks `.njk` templates (presentation logic only)
- **Controller**: Eleventy's data cascade and template engine

**Never** put HTML markup directly in `.md` files. Use structured front matter and let templates handle rendering.

### Content Structure Rules

1. **Static Pages** (`src/pages/*.md`):
   - YAML front matter defines all data (arrays, objects, strings)
   - Markdown body for introductory prose only
   - Corresponding layout in `src/_includes/layouts/` handles all HTML

2. **Blog Posts** (`src/posts/*.md`):
   - Front matter for metadata (title, date, tags, excerpt)
   - Pure Markdown prose body
   - Uses `layouts/post.njk` layout

3. **Layouts** (`src/_includes/layouts/*.njk`):
   - All Bulma HTML structure
   - Loops over front matter data
   - No hardcoded content (except structural elements)

## 🎨 NP50 Theme Guidelines

The "Nintendo Power No. 50" theme (July 1993 issue, Link's Awakening) has specific design constraints:

### Color Palette (Stick to these)

```scss
// Brand Core
$power-red: #e60012;
$power-gold: #ffc20e;

// Hero / Zelda Blues
$hero-blue: #1f3c88;
$sky-hint: #6fa3d9;

// Owl / Earth
$owl-umber: #8a4f2a;
$feather-rust: #c46a2d;
$shadow-bark: #3a2a1e;

// Environment
$koholint-grass: #5faf3a;
$parchment-sand: #c9a46a;
$aged-paper: #efe3c5;

// Neutrals
$ink-black: #1c1c1c;
$soft-shadow: #6b6b6b;
```

### Typography Hierarchy

- **Headers (h1-h4)**: Coral Pixels (pixel art font)
- **Body text**: Spectral (serif, readable)
- **Hero titles**: Sixtyfour Convergence (display font)
- **Code/mono**: Atkinson Hyperlegible (accessible monospace)

### Component Styling

- **Borders**: 2px solid with deterministic colors
- **Buttons**: Uppercase labels, mono font, outlined→filled on hover
- **Cards**: 2px borders, subtle lift on hover, rust color accent
- **Tags**: Deterministic HSL hashing, emoji prefixes

## 🖼️ GLSL Shader System

Each page can have a unique WebGL2 fragment shader in its hero section.

### Shader Development Guidelines

1. **Performance**: Target 60fps at 0.35× DPR (chunky retro pixels)
2. **RETRO_LIB**: Use shared functions (scanline, snow, quantize, rfJitter)
3. **Fallback**: Always ensure CSS gradient background looks good without shader
4. **Accessibility**: Shaders auto-disable with `prefers-reduced-motion`
5. **Safety**: Avoid rapid flashing (Toolbox deliberately mutes 80% of blocks)

### Shader Architecture

```javascript
// src/js/shader-hero.js structure:
// 1. RETRO_LIB (lines 29-80): Shared utility functions
// 2. Six page shaders (~100 lines each):
//    - Home: Dungeon Entrance
//    - About: Koholint Ocean
//    - Portfolio: Lost Woods Overworld
//    - Now: Time Gate (Chrono Trigger inspired)
//    - Toolbox: Diagnostic Screen
//    - Blog: Scroll Text
// 3. WebGL2 engine (lines ~634-799): Bootstrap and render loop
```

### Adding a New Shader

1. Add shader type to `SHADER_TYPES` object
2. Write fragment shader with `RETRO_LIB` functions
3. Test at 0.35× DPR for performance
4. Ensure fallback gradient exists in CSS
5. Set `data-shader="page-name"` in page's hero section

## 🏷️ Tag System (Critical Pattern)

The blog tag filtering system learned hard lessons about emoji handling.

### Emoji in Tags Pattern

**Display**: Tags can include emoji like `🎨 design`, `💾 css`

**Logic**: All filtering/hashing must use sanitized alphanumeric-only strings

**Implementation**:

```javascript
// Automatic sanitization function
function sanitizeTag(tag) {
  return tag
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase();
}

// NEVER hardcode emoji lists with chained replace() calls
// That approach was "a fucking disaster" (user's words) and:
// - Creates maintenance nightmare
// - Security risk (injection vulnerability)
// - Breaks with any new emoji
// - Massively overcomplicated
```

**Data Flow**:

1. Raw tags with emoji stored in front matter: `["🎨 design", "💾 css"]`
2. Display shows emoji everywhere (buttons, badges, cards)
3. JavaScript sanitizes for filtering: `["design", "css"]`
4. Color hashing uses sanitized strings for consistency
5. Filter matching uses sanitized strings

**Key Principle**: Emoji is purely cosmetic decoration, never used in logic.

## 📝 Common Patterns

### Creating a New Page

1. Create `src/pages/page-name.md` with front matter structure
2. Create `src/_includes/layouts/page-name.njk` for HTML
3. Add to navbar in `navbar.njk` if needed
4. Add hero shader if desired (optional)
5. Test with `npm run build`

### Adding a Blog Post

1. Create `src/posts/post-name.md`
2. Front matter: `title`, `date`, `tags`, `excerpt`
3. Pure Markdown body (no HTML)
4. Tags: Use emoji prefix + lowercase label
5. Posts auto-appear on blog index (reverse chronological)

### Modifying Styles

1. Edit `src/styles/main.scss`
2. Use existing NP50 color variables
3. Follow 10-layer structure (documented in file)
4. Test with `npm run build:sass`
5. Check for Sass deprecation warnings (Bulma has 6, non-blocking)

### Working with Front Matter

**Good** (structured data):

```yaml
projects:
  - name: "Project Name"
    tags: ["tag1", "tag2"]
    links:
      - text: "GitHub"
        url: "https://..."
```

**Bad** (inline HTML):

```yaml
# DON'T DO THIS
content: |
  <div class="card">
    <h2>Project Name</h2>
  </div>
```

## 🐛 Debugging Guidelines

### Build Failures

1. Check `npm run build:sass` first (Sass errors block Eleventy)
2. Check `npm run build:eleventy` for template errors
3. Look for missing closing tags in `.njk` files
4. Verify front matter YAML syntax (indentation matters)

### Shader Issues

1. Check browser console for WebGL errors
2. Verify `data-shader="page-name"` matches `SHADER_TYPES` key
3. Test with `prefers-reduced-motion` disabled
4. Check canvas z-index stacking (should be behind content)

### Styling Issues

1. Verify Bulma class names (v1.0.4 syntax)
2. Check if `!important` needed to override Bulma defaults
3. Use browser DevTools to inspect CSS custom properties
4. Confirm Google Fonts loaded (check Network tab)

## 🎓 Development Philosophy

### Inspectable

- Code should be readable without extensive documentation
- Comments explain _why_, not _what_
- Template logic stays simple

### Forkable

- Easy to clone and customize
- Configuration centralized in front matter
- No hidden magic or over-abstraction

### Learnable

- Documentation teaches by example
- Common patterns reused consistently
- Progressive complexity (start simple, layer features)

### Living

- Meant to evolve with creator's journey
- Changelog documents all changes
- Old approaches documented for context

## 🚫 Anti-Patterns to Avoid

1. **HTML in Markdown files**: Use front matter + templates
2. **Hardcoded emoji lists**: Use regex sanitization
3. **Inline styles**: Use CSS custom properties
4. **Chained replace() calls**: Use single regex patterns
5. **Over-engineering**: Keep solutions simple and maintainable

## 📊 Performance Targets

- **Build time**: < 1 second for 13 pages
- **Shader FPS**: 60fps at 0.35× DPR
- **Lighthouse scores**: All green (aim for 90+)
- **Sass compile**: < 0.5 seconds

## 🔐 Security Considerations

- External links: Use `rel="noopener noreferrer"`
- User input sanitization: Always use regex, never hardcoded lists
- CDN integrity: Use SRI hashes where possible
- No client-side data storage of sensitive info

## 📦 Dependencies

### Production

- `@11ty/eleventy: ^2.0.1`
- `bulma: ^1.0.4`
- `sass: ^1.85.0`

### Development

- `live-server: ^1.2.2`
- `npm-run-all: ^4.1.5`

## 🎮 VS Code Tasks

The project includes comprehensive VS Code tasks (`.vscode/tasks.json`):

- **Build & Validation**: Build All, Verify Build, Check Output
- **Development**: Start/Stop/Restart Server, Status
- **Maintenance**: Clean Build, Reinstall, Install Dependencies
- **Diagnostics**: Project Stats, List Pages, Deploy Check

Use these instead of manual terminal commands when possible.

## 📚 Key Files to Understand

1. **`eleventy.config.js`**: Site configuration, collections, filters
2. **`src/styles/main.scss`**: NP50 theme with 10 layers
3. **`src/js/shader-hero.js`**: WebGL2 engine + 6 shaders
4. **`src/_includes/layouts/base.njk`**: Base HTML structure
5. **`src/pages/blog.njk`**: Tag filtering system reference

## 🎯 When User Says...

- **"Touch the changelog"**: Update CHANGELOG.md with recent work
- **"Fix the tags"**: Check emoji sanitization pattern
- **"Shader isn't showing"**: Check WebGL2 support, `prefers-reduced-motion`, canvas z-index
- **"Styles aren't applying"**: Check Bulma specificity, might need `!important`
- **"Build failed"**: Run Sass and Eleventy separately to isolate issue

## 🔄 Recent Context (February 2026)

Major work completed:

- NP50 theme implementation (10-layer CSS architecture)
- 6 GLSL shaders with retro NES aesthetic
- MVC refactor (Model-View-Controller separation)
- Tag filtering with emoji support (regex sanitization pattern)
- Typography system (4 Google Fonts)
- Blog post chronological ordering
- Sass deprecation warnings silenced

Critical lessons learned:

- Emoji in tags requires automatic sanitization (regex, not hardcoded lists)
- `!important` sometimes needed to override Bulma defaults
- WebGL2 shaders need fallback CSS gradients
- Keep build times fast (<1 second)

---

**Last Updated**: February 14, 2026

This document evolves with the project. When you learn new patterns or encounter edge cases, add them here for future reference.

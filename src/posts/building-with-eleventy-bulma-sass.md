---
title: "Building with Eleventy, Bulma, and Sass"
date: 2026-01-27
layout: layouts/post.njk
description: "A deep dive into why I chose Eleventy + Bulma + Sass for this site, and how they work together beautifully."
tags:
  - posts
  - tutorial
  - eleventy
  - bulma
  - sass
---

## Choosing the Right Stack 🧬

When I set out to rebuild my GitHub Pages site, I had some specific goals in mind:

1. **Simple** - No over-engineering, no unnecessary complexity
2. **Inspectable** - Anyone should be able to understand how it works
3. **Customizable** - Easy to modify and make your own
4. **Modern** - Using current best practices and tools
5. **Fast** - Quick to build, quick to load

After evaluating several options, I landed on **Eleventy + Bulma + Sass**. Here's why.

## Why Eleventy? ⚡

[Eleventy](https://www.11ty.dev/) is a static site generator that just works. Here's what I love about it:

### It's Simple
No complex configuration. No magic. Just straightforward templating and content generation.

### It's Flexible
You can use multiple template languages (I chose Nunjucks), and it doesn't force you into a specific structure.

### It's Fast
Build times are incredibly fast. The development server with live reload is instant.

### It's Well-Documented
The docs are clear, examples are plentiful, and the community is helpful.

### Basic Eleventy Setup

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};
```

That's it! You're up and running.

## Why Bulma? 🧱

[Bulma](https://bulma.io/) is a modern CSS framework that I chose for several reasons:

### Pure CSS
No JavaScript dependencies. It's just CSS classes you apply to your HTML.

### Readable Class Names
Instead of cryptic abbreviations, Bulma uses clear, semantic names: `.button.is-primary`, `.card`, `.hero.is-large`.

### Great Components
Cards, navbars, heroes, modals — all the common patterns are built-in and well-designed.

### Flexbox-Based
Modern layout techniques baked in. Responsive by default.

### Easy to Customize
This is where Sass comes in...

## Why Sass? 🎨

[Sass](https://sass-lang.com/) is the glue that makes Bulma truly yours:

### Customize Bulma Variables

```scss
// Override Bulma's defaults before importing
$primary: #3273dc;
$family-sans-serif: "Segoe UI", sans-serif;

// Import Bulma
@import "../../node_modules/bulma/bulma.sass";
```

### Add Your Own Styles

```scss
// Custom enhancements
.card {
  transition: transform 0.2s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
}
```

### Modular Organization
Keep your styles organized in separate files and import them as needed.

## How They Work Together 🤝

The workflow is beautiful in its simplicity:

1. **Write content** in Markdown (`src/posts/my-post.md`)
2. **Use Nunjucks templates** for layout (`src/_includes/layouts/post.njk`)
3. **Style with Bulma** classes in your templates
4. **Customize with Sass** (`src/styles/main.scss`)
5. **Build with Eleventy** (`npm run build`)

### The Build Pipeline

```json
{
  "scripts": {
    "build:sass": "sass src/styles/main.scss _site/css/main.css",
    "build:eleventy": "eleventy",
    "build": "npm run build:sass && npm run build:eleventy"
  }
}
```

First, Sass compiles your styles. Then, Eleventy generates your HTML. Clean and simple.

## Example: Creating a Page

### 1. Write Markdown

```markdown
---
layout: layouts/page.njk
title: "About Me"
---

## Hello!

I'm a developer who loves building things.
```

### 2. Use Bulma in Template

```html
<section class="section">
  <div class="container">
    <div class="content">
      {{ content | safe }}
    </div>
  </div>
</section>
```

### 3. Customize with Sass

```scss
.section {
  padding: 3rem 1.5rem;
}
```

### 4. Build

```bash
npm run build
```

Done! Your page is ready.

## The Benefits 🌟

This stack gives you:

- **Fast development** - Change Markdown, see results instantly
- **Easy styling** - Bulma provides the foundation, Sass lets you customize
- **Clean code** - Separation of content, structure, and style
- **Great performance** - Static HTML, minimal CSS, no runtime JS
- **Easy deployment** - Just commit and push to GitHub Pages

## Conclusion 🎯

Eleventy + Bulma + Sass is a powerful combination that stays out of your way while giving you everything you need.

**Simple enough for beginners, flexible enough for experts.**

Want to try it yourself? Clone [this repo](https://github.com/MarkusBitterman/MarkusBitterman.github.io) and start building!

---

*Have questions about this stack? Open an issue on GitHub or reach out!*

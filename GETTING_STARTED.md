# 🚀 Getting Started Guide

Welcome! This guide will help you get this site up and running, understand how it works, and customize it for your own use.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Understanding the Structure](#understanding-the-structure)
- [Creating Your First Page](#creating-your-first-page)
- [Writing Your First Blog Post](#writing-your-first-blog-post)
- [Customizing Styles](#customizing-styles)
- [Deploying to GitHub Pages](#deploying-to-github-pages)
- [Troubleshooting](#troubleshooting)
- [Using VS Code Tasks](#using-vs-code-tasks)

---

## Prerequisites

Before you begin, make sure you have:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download here](https://git-scm.com/)
- A **text editor** (VS Code, Sublime Text, Vim, etc.)
- A **GitHub account** (for deployment)

> **NixOS / Nix Users**: You can skip installing Node.js and npm manually. A `shell.nix` file is included — just run `nix-shell` in the project root and everything you need is provided.

### Verify Your Installation

```bash
node --version  # Should show v18 or higher
npm --version   # Should show 8.x or higher
git --version   # Should show 2.x or higher
```

---

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MarkusBitterman/MarkusBitterman.github.io.git
cd MarkusBitterman.github.io
```

### 2. Install Dependencies

```bash
npm install
```

**Or, if you're using Nix/NixOS:**

```bash
nix-shell
# Dependencies install automatically when the shell activates
```

This will install:

- Eleventy (static site generator)
- Bulma (CSS framework)
- Sass (CSS preprocessor)

### 3. Start the Development Server

```bash
npm start
```

This will:

- Compile your Sass to CSS
- Build your site with Eleventy
- Start a local server at `http://localhost:8080`
- Watch for changes and auto-reload

### 4. Open Your Browser

Navigate to `http://localhost:8080` and you should see your site!

---

## Understanding the Structure

### Directory Layout

```text
MarkusBitterman.github.io/
├── src/                           # All source files
│   ├── _includes/                 # Templates and reusable components
│   │   ├── layouts/               # Page layouts
│   │   │   ├── base.njk          # Base HTML structure
│   │   │   ├── page.njk          # Layout for static pages
│   │   │   └── post.njk          # Layout for blog posts
│   │   └── partials/              # Reusable components
│   │       ├── navbar.njk        # Navigation bar
│   │       ├── footer.njk        # Site footer
│   │       └── hero.njk          # Hero section
│   ├── pages/                     # Static pages
│   │   ├── about.md
│   │   ├── portfolio.md
│   │   ├── now.md
│   │   └── etc...
│   ├── posts/                     # Blog posts
│   │   ├── welcome.md
│   │   └── etc...
│   ├── styles/                    # Sass/CSS files
│   │   └── main.scss             # Main stylesheet
│   ├── assets/                    # Images, fonts, etc.
│   │   └── images/
│   └── index.md                   # Home page
├── _site/                         # Generated site (git-ignored)
├── .eleventy.js                   # Eleventy configuration
├── package.json                   # Dependencies and scripts
└── README.md                      # Project documentation
```

### How It Works

1. **Markdown Files** (`src/pages/`, `src/posts/`, `src/index.md`)
   - Where you write your content
   - Front matter (YAML) at the top controls behavior

2. **Templates** (`src/_includes/`)
   - Nunjucks templates that wrap your content
   - Layouts define the page structure
   - Partials are reusable components

3. **Styles** (`src/styles/`)
   - Sass files that compile to CSS
   - Imports and customizes Bulma
   - Adds custom styling

4. **Build Output** (`_site/`)
   - Generated static HTML/CSS
   - Ready to deploy
   - Not committed to git

---

## Creating Your First Page

### Step 1: Create a Markdown File

Create a new file: `src/pages/my-page.md`

```markdown
---
layout: layouts/page.njk
title: "My New Page"
description: "This is my custom page"
hero: true
heroTitle: "🎉 My Custom Page"
heroSubtitle: "Building something awesome"
permalink: /my-page/index.html
---

## Welcome to My Page

This is some content written in **Markdown**.

- Easy to write
- Easy to read
- Easy to maintain

### Code Example

```javascript
console.log("Hello, world!");
```

Check out more on my [about page](/about/)!

```markdown

### Step 2: Add to Navigation (Optional)

Edit `src/_includes/partials/navbar.njk` and add:

```html
<a class="navbar-item" href="/my-page/">
  🎉 My Page
</a>
```

### Step 3: View Your Page

The dev server should auto-reload. Navigate to `http://localhost:8080/my-page/`

---

## Writing Your First Blog Post

### Step 1: Create a Post File

Create a new file: `src/posts/my-first-post.md`

```markdown
---
title: "My First Blog Post"
date: 2026-01-28
layout: layouts/post.njk
description: "This is my very first blog post!"
tags:
  - posts
  - beginner
  - tutorial
---

## Hello, Blog!

This is my first blog post. Here's what I learned today:

### Markdown is Awesome

- It's simple
- It's readable
- It's portable

### Code Highlighting

```python
def hello():
    print("Hello from my blog!")
```

More content here...

```markdown

### Step 2: View Your Post

Posts automatically appear at:
- Individual post: `http://localhost:8080/posts/my-first-post/`
- Blog index: `http://localhost:8080/blog/`

### Post Front Matter Explained

- `title`: Post title (required)
- `date`: Publication date (required) - format: YYYY-MM-DD
- `layout`: Which template to use (required) - usually `layouts/post.njk`
- `description`: SEO description (optional but recommended)
- `tags`: Categories (optional) - always include "posts" to add to collection

---

## Customizing Styles

### Quick Color Changes

Edit `src/styles/main.scss`:

```scss
// Change primary color
$primary: #ff6b6b;  // Red
// $primary: #4ecdc4;  // Teal
// $primary: #95e1d3;  // Mint

// Change link color
$link: #3273dc;

// Import Bulma with your custom colors
@import "../../node_modules/bulma/bulma.sass";

// Add your custom CSS
.my-custom-class {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  color: white;
}
```

### Using Bulma Components

Bulma provides ready-to-use components. Examples:

**Button:**

```html
<a href="/about/" class="button is-primary is-large">
  Learn More
</a>
```

**Card:**

```html
<div class="card">
  <div class="card-content">
    <p class="title">Card Title</p>
    <p class="subtitle">Card Subtitle</p>
    <div class="content">
      Card content here...
    </div>
  </div>
</div>
```

**Notification:**

```html
<div class="notification is-info">
  This is an info notification!
</div>
```

[See all Bulma components](https://bulma.io/documentation/components/)

---

## Deploying to GitHub Pages

### Option 1: Using GitHub Actions (Recommended)

The `.github/workflows/deploy.yml` file is already set up!

**Steps:**

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Initial site setup"
   git push origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repo on GitHub
   - Settings → Pages
   - Source: GitHub Actions

3. **Done!** Your site will build and deploy automatically on every push.

### Option 2: Manual Deployment

1. **Build the site:**

   ```bash
   npm run build
   ```

2. **Deploy the `_site/` folder** to your hosting provider

---

## Troubleshooting

### Development Server Won't Start

**Problem:** Port 8080 already in use

**Solution:** Kill the process or use a different port:

```bash
npx eleventy --serve --port=3000
```

### Styles Not Loading

**Problem:** CSS file not found

**Solution:**

1. Make sure Sass compiled: `npm run build:sass`
2. Check `_site/css/main.css` exists
3. Clear browser cache

### Changes Not Showing

**Solution:**

1. Make sure dev server is running
2. Check for syntax errors in terminal
3. Hard refresh: Ctrl+Shift+R (Windows/Linux) or Cmd+Shift+R (Mac)

### Build Errors

**Problem:** "Layout does not exist"

**Solution:** Check front matter in your Markdown:

- Use `layouts/page.njk`, not `layouts/page`
- Layouts are relative to `src/_includes/`

### Can't Install Dependencies

**Problem:** npm install fails

**Solution:**

1. Delete `node_modules/` and `package-lock.json`
2. Run `npm install` again
3. Make sure Node.js is v18 or higher

---

## 🎮 Using VS Code Tasks

If you're using VS Code, you can use keyboard shortcuts instead of typing commands:

### Quick Access

Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac), then type "Run Task" to see all available tasks.

**Or use default shortcuts:**

- `Ctrl+Shift+B` - Build All (default build task)
- `Ctrl+Shift+T` then `Ctrl+Shift+B` - Verify Build (default test task)

### Available Tasks

#### 🛠️ Build & Validation

- **✅ Verify Build** - Run full build to check for errors
- **🛠️ Build All** - Build Sass + Eleventy for production
- **📄 Build Eleventy** - Build HTML only
- **🎨 Build Sass** - Compile CSS only
- **🔍 Check Output** - View build statistics and file counts

#### 🚀 Development Server

- **▶️ Start Server** - Launch dev server at <http://localhost:8080> with hot reload
- **⏹️ Stop Server** - Stop the running server
- **🔄 Restart Server** - Restart the server (useful after config changes)
- **📡 Server Status** - Check if server is running

#### 🧹 Maintenance

- **🗑️ Clean Build** - Delete `_site/` directory
- **🗑️ Clean All** - Remove `_site/`, `node_modules/`, and `package-lock.json`
- **📦 Install Dependencies** - Run `npm install`
- **🔄 Reinstall** - Clean everything and reinstall from scratch

#### 📊 Diagnostics

- **📊 Project Stats** - See file counts, line counts, and disk usage
- **🔍 List Pages** - Show all pages and posts in the project
- **🚀 Deploy Check** - Verify the build is ready for deployment

### Task Workflow Examples

#### Starting fresh for the day

1. Run Task: ▶️ Start Server
2. Make changes to your files
3. Browser auto-reloads!

#### Build stopped working

1. Run Task: 🗑️ Clean Build
2. Run Task: 🛠️ Build All
3. Run Task: ▶️ Start Server

#### Something is really broken

1. Run Task: 🔄 Reinstall (cleans everything + fresh npm install)
2. Run Task: ▶️ Start Server

#### Before deploying

1. Run Task: 🚀 Deploy Check (verifies everything is ready)
2. Push to GitHub

---

## Next Steps

Now that you have the basics:

1. ✅ **Customize** the content to match your personality
2. ✅ **Add** your own projects to the portfolio
3. ✅ **Write** blog posts regularly
4. ✅ **Experiment** with Bulma components
5. ✅ **Share** your site with the world!

---

## Getting Help

- **Eleventy Docs:** <https://www.11ty.dev/docs/>
- **Bulma Docs:** <https://bulma.io/documentation/>
- **Sass Guide:** <https://sass-lang.com/guide>
- **Open an Issue:** <https://github.com/MarkusBitterman/MarkusBitterman.github.io/issues>

---

Happy building! 🚀

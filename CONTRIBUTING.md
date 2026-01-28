# 🛠️ Development Workflow & Contribution Guide

This guide covers the complete development workflow, testing procedures, and contribution guidelines for this GitHub Pages site.

## Table of Contents

- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Troubleshooting](#troubleshooting)

---

## 🚀 Development Setup

### Standard Desktop Setup (Linux/Mac/Windows)

#### Prerequisites

- **Node.js** v14 or higher
- **npm** v6 or higher
- **Git**
- A text editor (VS Code recommended)

#### Installation

```bash
# Clone the repository
git clone https://github.com/MarkusBitterman/MarkusBitterman.github.io.git
cd MarkusBitterman.github.io

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:8080` to view your site.

### NixOS Setup

If you're using NixOS (like the project owner):

```nix
# shell.nix or flake.nix
{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    nodejs_18
    git
  ];
}
```

Then:

```bash
nix-shell  # or nix develop for flakes
npm install
npm start
```

### Mobile Setup (Termux + Acode)

See [TERMUX_SETUP.md](./TERMUX_SETUP.md) for detailed mobile development instructions.

---

## 💻 Development Workflow

### Project Structure

```
MarkusBitterman.github.io/
├── src/                    # Source files
│   ├── _includes/          # Nunjucks templates
│   │   ├── layouts/        # Page layouts
│   │   └── partials/       # Reusable components
│   ├── pages/              # Static pages
│   ├── posts/              # Blog posts
│   ├── styles/             # Sass/SCSS
│   └── index.md            # Homepage
├── tests/                  # Test scripts
├── _site/                  # Generated site (git-ignored)
├── .eleventy.js            # Eleventy config
├── package.json            # Dependencies & scripts
└── README.md               # Main documentation
```

### Available Commands

| Command | Description |
|---------|-------------|
| `npm start` | Start dev server with live reload |
| `npm run build` | Build site for production |
| `npm run build:eleventy` | Build HTML only |
| `npm run build:sass` | Compile Sass to CSS |
| `npm run clean` | Delete `_site/` directory |
| `npm test` | Run all tests |
| `npm run test:build` | Test that build completes |
| `npm run test:html` | Validate HTML |
| `npm run test:links` | Check for broken links |

### Daily Workflow

1. **Start Development Server**
   ```bash
   npm start
   ```

2. **Make Changes**
   - Edit files in `src/`
   - Changes auto-reload in browser

3. **Preview Changes**
   - Open `http://localhost:8080`
   - Test on different browsers if possible

4. **Test Your Changes**
   ```bash
   npm test
   ```

5. **Commit and Push**
   ```bash
   git add .
   git commit -m "Descriptive commit message"
   git push
   ```

### Creating Content

#### New Blog Post

```bash
# Create file: src/posts/my-post.md
```

```markdown
---
title: "My Post Title"
date: 2026-01-28
layout: layouts/post.njk
description: "Post description for SEO"
tags:
  - posts
  - tutorial
---

## Your Content Here

Write in Markdown!
```

**Tips:**
- Date format: `YYYY-MM-DD`
- Always include `posts` tag to add to collection
- Use descriptive titles and descriptions

#### New Page

```bash
# Create file: src/pages/my-page.md
```

```markdown
---
layout: layouts/page.njk
title: "Page Title"
description: "Page description"
hero: true
heroTitle: "🎉 Hero Title"
heroSubtitle: "Hero subtitle"
permalink: /my-page/index.html
---

## Page Content

Your content here...
```

**Tips:**
- Set `permalink` to control URL structure
- Use `hero: true` for pages that need a hero section
- Add to navbar by editing `src/_includes/partials/navbar.njk`

#### Styling Changes

Edit `src/styles/main.scss`:

```scss
// Customize Bulma variables
$primary: #3273dc;
$link: #ff6b6b;

// Import Bulma
@import "../../node_modules/bulma/bulma.sass";

// Custom styles
.my-custom-class {
  // Your styles
}
```

**Tips:**
- Change variables before the `@import` statement
- Use Bulma's built-in variables for consistency
- Test on mobile and desktop

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
npm test

# Run specific tests
npm run test:html    # HTML validation
npm run test:links   # Link checking
npm run test:build   # Build verification
```

### HTML Validation

The HTML validator checks all generated HTML files for W3C compliance.

**What it checks:**
- Valid HTML5 structure
- Proper tag nesting
- Accessibility attributes
- Meta tags

**Common issues:**
- Missing alt attributes on images
- Unclosed tags
- Invalid HTML5 elements

### Link Checking

The link checker scans for broken internal links.

**What it checks:**
- All `<a href="">` links
- CSS file references
- Internal page links

**What it ignores:**
- External links (http://, https://)
- Email links (mailto:)
- Anchor-only links (#section)

### Writing Tests

If you want to add more tests, create a new file in `tests/`:

```javascript
// tests/my-test.js
const fs = require('fs');
const path = require('path');

async function myTest() {
  console.log('🧪 Running my test...');
  
  // Your test logic here
  
  console.log('✅ Test passed!');
}

myTest().catch(err => {
  console.error('❌ Test failed:', err);
  process.exit(1);
});
```

Add it to `package.json`:

```json
"scripts": {
  "test:mytest": "node tests/my-test.js"
}
```

---

## 🚀 Deployment

### Automatic Deployment (GitHub Actions)

This repository uses GitHub Actions for automated deployment.

**How it works:**

1. Push to `main` branch
2. GitHub Actions workflow triggers
3. Site is built automatically
4. Deployed to GitHub Pages

**Workflow file:** `.github/workflows/deploy.yml`

**To enable:**

1. Go to repository Settings → Pages
2. Source: GitHub Actions
3. Done! Automatic deployment is active

### Manual Deployment

If you need to deploy manually:

```bash
# Build the site
npm run build

# The _site/ folder contains your complete static site
# Deploy this folder to any static hosting provider
```

### Deployment Checklist

Before deploying:

- [ ] All tests pass (`npm test`)
- [ ] No broken links
- [ ] HTML is valid
- [ ] Site builds without errors
- [ ] Preview looks good locally
- [ ] Commit message is descriptive

---

## 🤝 Contributing

### Contribution Workflow

1. **Fork the repository**

2. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

3. **Make your changes**
   - Follow the code style
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm test
   ```

5. **Commit your changes**
   ```bash
   git commit -m "feat: Add awesome feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/my-feature
   ```

7. **Open a Pull Request**
   - Describe your changes
   - Reference any related issues
   - Wait for review

### Commit Message Guidelines

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

**Examples:**

```bash
git commit -m "feat: Add dark mode toggle"
git commit -m "fix: Correct broken navigation link"
git commit -m "docs: Update installation instructions"
```

### Code Style

- **Indentation:** 2 spaces
- **Line length:** Max 80-120 characters
- **Markdown:** Use ATX-style headers (`#`)
- **HTML/Nunjucks:** Semantic HTML, proper indentation
- **Sass/SCSS:** Follow BEM methodology when possible

**EditorConfig** and **VS Code settings** are provided for consistency.

### Pull Request Guidelines

- Keep changes focused and atomic
- Include tests for new features
- Update documentation
- Ensure all tests pass
- Write descriptive PR titles and descriptions

---

## 🐛 Troubleshooting

### Build Issues

**Problem:** Build fails with "command not found"

**Solution:** Make sure dependencies are installed:
```bash
npm install
```

**Problem:** Sass compilation errors

**Solution:** Check `src/styles/main.scss` for syntax errors. Common issues:
- Missing semicolons
- Incorrect variable references
- Invalid Sass syntax

### Server Issues

**Problem:** Port 8080 already in use

**Solution:** Use a different port:
```bash
npx eleventy --serve --port=3000
```

**Problem:** Changes not showing up

**Solution:**
1. Hard refresh: Ctrl+Shift+R (Cmd+Shift+R on Mac)
2. Clear browser cache
3. Restart dev server

### Testing Issues

**Problem:** Tests fail with "No HTML files found"

**Solution:** Build the site first:
```bash
npm run build
npm test
```

**Problem:** HTML validation failures

**Solution:** Check the specific errors reported and fix HTML in templates or content files.

### Git Issues

**Problem:** Can't push to GitHub

**Solution:** Check authentication:
```bash
# For HTTPS
git remote set-url origin https://github.com/username/repo.git

# For SSH
git remote set-url origin git@github.com:username/repo.git
```

**Problem:** Merge conflicts

**Solution:** Resolve conflicts manually:
```bash
git status  # See conflicted files
# Edit files to resolve conflicts
git add .
git commit
```

---

## 📚 Additional Resources

### Documentation

- [Eleventy Documentation](https://www.11ty.dev/docs/)
- [Bulma Documentation](https://bulma.io/documentation/)
- [Sass Guide](https://sass-lang.com/guide)
- [Nunjucks Templating](https://mozilla.github.io/nunjucks/)

### Tools

- [HTML Validator](https://validator.w3.org/)
- [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci)
- [Git Documentation](https://git-scm.com/doc)

### Learning

- [Markdown Guide](https://www.markdownguide.org/)
- [Web.dev](https://web.dev/)
- [MDN Web Docs](https://developer.mozilla.org/)

---

## 🎯 Best Practices

### Content

- Write descriptive titles and meta descriptions
- Use proper heading hierarchy (h1 → h2 → h3)
- Add alt text to all images
- Keep posts well-organized with subheadings

### Code

- Use semantic HTML
- Follow accessibility guidelines (WCAG)
- Optimize images before adding
- Keep CSS organized and modular

### Git

- Commit frequently with meaningful messages
- Pull before pushing
- Keep commits focused and atomic
- Review changes before committing

### Performance

- Minimize CSS/JS when possible
- Optimize images (use WebP when supported)
- Lazy load images below the fold
- Monitor bundle size

---

## 💡 Tips & Tricks

### Quick Commands

```bash
# Clean build
npm run clean && npm run build

# Watch for changes without server
npm run watch

# Test specific file
node tests/validate-html.js

# Check Git status with more detail
git status -sb
```

### VS Code Shortcuts

- `Ctrl+P` - Quick file open
- `Ctrl+Shift+P` - Command palette
- `Ctrl+\`` - Toggle terminal
- `Ctrl+B` - Toggle sidebar
- `F5` - Start debugging

### Productivity

- Use snippets for common patterns
- Set up Git aliases for frequent commands
- Use `git commit --amend` for fixing last commit
- Create shell aliases for npm scripts

---

## 📞 Getting Help

- **Issues:** Open an issue on GitHub
- **Discussions:** Use GitHub Discussions
- **Email:** Contact the maintainer
- **Documentation:** Check README.md and GETTING_STARTED.md

---

**Happy coding! 🚀**

*This is a living document. If you find something unclear or have suggestions, please contribute!*

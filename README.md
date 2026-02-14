# 🧾✨ MarkusBitterman.github.io

A living GitHub Pages site: Portfolio • Blog • Devlog • Toolbox • Starter Kit

[![Live Site](https://img.shields.io/badge/live-site-blue)](https://MarkusBitterman.github.io)
[![Built with Eleventy](https://img.shields.io/badge/built%20with-Eleventy-brightgreen)](https://www.11ty.dev/)
[![Styled with Bulma](https://img.shields.io/badge/styled%20with-Bulma-00d1b2)](https://bulma.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## 🎯 What This Is

This repository is a **simple-but-smart GitHub Pages site** that serves as:

- **📰 A Journal** - Thoughts and reflections
- **🧑🏻‍💻 A Devlog** - Development updates (inspired by the classic Unix "finger file" tradition)
- **🪵 A Blog** - Tutorials and long-form content
- **🏪 A Portfolio** - Showcase of projects and work
- **🪪 A Live Business Card** - Professional presence on the web
- **🧰 A Toolbox** - Small interactive client-side utilities (key generators, dice rollers, etc.)
- **📺 A Starter Kit** - A real example you can clone, learn from, and customize

**Most importantly**: This repo is designed to be **inspected, forked, and remixed**. Everything is visible, understandable, and ready to be made your own.

---

## 🧬 Tech Stack

- **[Eleventy (11ty)](https://www.11ty.dev/)** - Static site generation
- **[Nunjucks](https://mozilla.github.io/nunjucks/)** - Templating
- **[Markdown](https://daringfireball.net/projects/markdown/)** - Content writing
- **[Bulma](https://bulma.io/)** - CSS framework
- **[Sass](https://sass-lang.com/)** - Style customization
- **[GitHub Pages](https://pages.github.com/)** - Hosting

This stack hits the sweet spot: **modern structure, minimal fuss, maximum inspectability**.

---

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js)
- A text editor (VS Code, Vim, whatever you love)

> **NixOS / Nix Users**: A `shell.nix` is included! Just run `nix-shell` in the project root and you're ready to go — Node.js, npm, and Dart Sass are all provided automatically.

### Installation

1. **Clone this repository**

   ```bash
   git clone https://github.com/MarkusBitterman/MarkusBitterman.github.io.git
   cd MarkusBitterman.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

   *Or, if using Nix:*

   ```bash
   nix-shell   # dependencies install automatically on shell entry
   ```

3. **Start the development server**

   ```bash
   npm start
   ```

4. **Open your browser**

   Navigate to `http://localhost:8080`

   The site will automatically reload when you make changes!

### Building for Production

```bash
npm run build
```

This generates the static site in the `_site/` directory, ready for deployment.

---

## 📂 Project Structure

```text
MarkusBitterman.github.io/
├── src/                      # Source files
│   ├── _includes/            # Templates and partials
│   │   ├── layouts/          # Page layouts (base, page, post)
│   │   └── partials/         # Reusable components (navbar, footer, hero)
│   ├── pages/                # Static pages (about, portfolio, now, etc.)
│   ├── posts/                # Blog/devlog posts
│   ├── styles/               # Sass/CSS files
│   │   └── main.scss         # Main stylesheet (imports Bulma + custom styles)
│   ├── assets/               # Static assets (images, etc.)
│   └── index.md              # Home page
├── .vscode/                  # VS Code workspace settings & extensions
├── .github/workflows/        # GitHub Actions CI/CD
├── _site/                    # Generated site (git-ignored)
├── .eleventy.js              # Eleventy configuration
├── .editorconfig             # Editor formatting rules
├── shell.nix                 # Nix development environment
├── package.json              # Dependencies and scripts
├── .gitignore                # Git ignore rules
└── README.md                 # This file!
```

---

## ✍️ Creating Content

### Adding a New Page

1. Create a new Markdown file in `src/pages/`:

   ```markdown
   ---
   layout: layouts/page.njk
   title: "My New Page"
   description: "Description for SEO"
   permalink: /my-page/index.html
   ---

   ## Your Content Here

   Write your content in Markdown!
   ```

2. Add it to the navbar in `src/_includes/partials/navbar.njk`

3. Done! The page will be built automatically.

### Adding a Blog Post

1. Create a new Markdown file in `src/posts/`:

   ```markdown
   ---
   title: "My First Post"
   date: 2026-01-28
   layout: layouts/post.njk
   description: "A brief description"
   tags:
     - posts
     - tutorial
   ---

   ## Your Post Content

   Write your post in Markdown!
   ```

2. The post will automatically appear in `/blog/`

3. Posts are sorted by date (newest first)

---

## 🎨 Customizing Styles

### Quick Customization

Edit `src/styles/main.scss` to change colors and styles:

```scss
// Change primary color
$primary: #3273dc;

// Change font
$family-sans-serif: "Your Font", sans-serif;

// Import Bulma
@import "../../node_modules/bulma/bulma.sass";

// Add your custom styles
.your-custom-class {
  // Your styles here
}
```

### Using Bulma Components

Bulma provides many ready-to-use components. Check out:

- [Bulma Documentation](https://bulma.io/documentation/)
- Examples in `src/_includes/` templates

---

## 🛠️ Available Commands

| Command | Description |
| ------- | ----------- |
| `npm start` | Start development server with hot reload |
| `npm run build` | Build site for production |
| `npm run build:eleventy` | Build HTML only (Eleventy) |
| `npm run build:sass` | Compile Sass to CSS |
| `npm run watch` | Watch for changes (both Eleventy and Sass) |
| `npm run clean` | Delete the `_site/` directory |

### VS Code Tasks

If you're using VS Code, press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) and type "Run Task" to access these shortcuts:

**Build & Validation:**

- **✅ Verify Build** - Full build validation (default test task: `Ctrl+Shift+B` on test)
- **🛠️ Build All** - Production build (default: `Ctrl+Shift+B`)
- **🔍 Check Output** - Show build statistics
- **📄 Build Eleventy** - HTML only
- **🎨 Build Sass** - CSS only

**Development Server:**

- **▶️ Start Server** - Launch dev server at <http://localhost:8080>
- **⏹️ Stop Server** - Kill running server
- **🔄 Restart Server** - Stop and restart
- **📡 Server Status** - Check if server is running

**Maintenance:**

- **🗑️ Clean Build** - Remove `_site/`
- **🗑️ Clean All** - Remove `_site/`, `node_modules/`, `package-lock.json`
- **📦 Install Dependencies** - Run `npm install`
- **🔄 Reinstall** - Clean all + fresh install

**Diagnostics:**

- **📊 Project Stats** - File counts, line counts, disk usage
- **🔍 List Pages** - Show all pages and posts
- **🚀 Deploy Check** - Verify build is deployment-ready

---

## 📝 README vs Homepage

This project keeps **two separate files** for different audiences:

- **`README.md`** (this file) - GitHub repository documentation for developers
  - How to install and run the project
  - Technical details and project structure
  - Contributing guidelines
  - Shown on the GitHub repo page

- **`src/index.md`** - Website homepage for visitors
  - Welcome message and site navigation
  - Links to portfolio, blog, toolbox
  - Visitor-focused content
  - Shown at `https://MarkusBitterman.github.io`

They serve **different purposes** and should stay separate. The README is for people exploring the code; the homepage is for people visiting the site.

---

## 🚢 Deploying to GitHub Pages

### Option 1: Manual Deploy (Simple)

1. Build the site:

   ```bash
   npm run build
   ```

2. The `_site/` folder contains your complete static site

3. Deploy however you prefer!

### Option 2: GitHub Actions (Automated)

A GitHub Actions workflow is already included at `.github/workflows/deploy.yml`. It automatically builds and deploys the site on every push to `main`.

To use it:

1. Go to your repo on GitHub → **Settings** → **Pages**
2. Under **Source**, select **GitHub Actions**
3. Push your changes to `main` — the site will build and deploy automatically!

---

## 🧭 Key Concepts

### Markdown-First Workflow

Write content in Markdown. Templates and styling are separate. Simple and clean.

### Layouts & Templates

- **Layouts** define the page structure (`base.njk`, `page.njk`, `post.njk`)
- **Partials** are reusable components (`navbar.njk`, `footer.njk`)
- **Front matter** (YAML at the top of files) controls behavior

### Collections

Posts are automatically collected and sorted by Eleventy. See `.eleventy.js` for configuration.

### Sass Workflow

Sass compiles to CSS. Bulma is imported as Sass, so you can customize variables before importing.

---

## 📚 Learning Resources

### Eleventy

- [Official Docs](https://www.11ty.dev/docs/)
- [Starter Projects](https://www.11ty.dev/docs/starter/)
- [Tutorials](https://www.11ty.dev/docs/tutorials/)

### Bulma

- [Documentation](https://bulma.io/documentation/)
- [Components](https://bulma.io/documentation/components/)
- [Customize](https://bulma.io/documentation/customize/)

### Sass

- [Sass Guide](https://sass-lang.com/guide)
- [Sass Basics](https://sass-lang.com/documentation)

---

## 🤝 Contributing

This is primarily a personal site, but if you spot bugs or have suggestions:

1. Open an issue
2. Submit a pull request
3. Share your own fork!

**Better yet**: Fork this repo and build your own version!

---

## 📜 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

**TL;DR**: You can use this code for anything, including commercial projects. Just include the license file.

---

## 🙏 Acknowledgments

- Inspired by the classic Unix "finger file" tradition (`.plan` files)
- Built on the shoulders of giants: Eleventy, Bulma, Sass, and the open source community
- Thanks to Derek Sivers for the [/now page movement](https://nownownow.com/about)

---

## 💬 Get in Touch

- **GitHub**: [@MarkusBitterman](https://github.com/MarkusBitterman)
- **Website**: [MarkusBitterman.github.io](https://MarkusBitterman.github.io)

---

## 🎉 Final Thoughts

This site is designed to be:

- ✅ **Inspectable** - Look at the code, understand how it works
- ✅ **Forkable** - Clone it, make it yours
- ✅ **Learnable** - Documentation by example
- ✅ **Shareable** - Spread the knowledge

**Clone this repo. Build your own. Share what you make.** 🚀

---

*Made with ❤️, ☕, and a commitment to building in the open.*

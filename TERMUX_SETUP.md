# 📱 Termux & Acode Development Setup

This guide will help you set up and develop this GitHub Pages site on an Android device using **Termux** (terminal emulator) and **Acode** (code editor).

## 🎯 Overview

You can fully develop, build, test, and deploy this site from your Android device! This setup gives you:

- ✅ Full Node.js development environment
- ✅ Git for version control
- ✅ Live development server
- ✅ Building and testing capabilities
- ✅ Integration with GitHub

## 📦 Prerequisites

1. **Termux** - Terminal emulator for Android
   - [Download from F-Droid](https://f-droid.org/en/packages/com.termux/) (recommended)
   - [Download from GitHub](https://github.com/termux/termux-app/releases)
   - ⚠️ **Do NOT use Google Play version** (outdated and unsupported)

2. **Acode** - Code editor for Android
   - [Download from Play Store](https://play.google.com/store/apps/details?id=com.foxdebug.acodefree)
   - [Download from F-Droid](https://f-droid.org/en/packages/com.foxdebug.acode/)

3. **GitHub Account** - For version control and deployment

---

## 🚀 Step 1: Set Up Termux

### Initial Termux Setup

1. **Open Termux** and update packages:
   ```bash
   pkg update && pkg upgrade
   ```

2. **Install essential packages:**
   ```bash
   pkg install git nodejs python
   ```

3. **Grant Termux storage access** (to access files from Acode):
   ```bash
   termux-setup-storage
   ```
   
   - Grant permission when prompted
   - This creates a `~/storage` folder with access to your device storage

4. **Verify installations:**
   ```bash
   node --version  # Should show v18 or higher
   npm --version   # Should show 9.x or higher
   git --version   # Should show 2.x or higher
   ```

### Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Set Up GitHub Authentication

**Option 1: Personal Access Token (Recommended for Mobile)**

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy the token
4. Use it as your password when pushing to GitHub

**Option 2: SSH Key**

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Display public key
cat ~/.ssh/id_ed25519.pub

# Copy this and add to GitHub → Settings → SSH Keys
```

---

## 📂 Step 2: Clone and Set Up Repository

### Clone the Repository

```bash
# Navigate to shared storage (accessible by Acode)
cd ~/storage/shared/Documents

# Create a projects folder
mkdir -p github-projects
cd github-projects

# Clone your repository
git clone https://github.com/MarkusBitterman/MarkusBitterman.github.io.git
cd MarkusBitterman.github.io
```

### Install Dependencies

```bash
npm install
```

This will install:
- Eleventy (static site generator)
- Bulma (CSS framework)
- Sass (CSS preprocessor)
- Testing tools

---

## 🛠️ Step 3: Development Workflow

### Start Development Server

```bash
npm start
```

This will:
- Build your site
- Start a local server at `http://localhost:8080`
- Watch for changes and auto-reload

### Access the Site

Open your mobile browser and navigate to:
```
http://localhost:8080
```

You can now edit files in Acode and see live changes!

### Build for Production

```bash
npm run build
```

Generates static files in `_site/` directory.

### Run Tests

```bash
npm test
```

Runs HTML validation and link checking.

---

## ✏️ Step 4: Set Up Acode

### Configure Acode for Your Project

1. **Open Acode**

2. **Add Folder:**
   - Tap ☰ menu → "Open Folder"
   - Navigate to: `storage/emulated/0/Documents/github-projects/MarkusBitterman.github.io`
   - Select the folder

3. **Recommended Settings:**
   - Tap ☰ → Settings
   - Editor:
     - Tab size: 2
     - Use soft tabs: ✓
     - Word wrap: ✓
   - Files:
     - Auto save: ✓ (after 2 seconds)

### Install Useful Acode Plugins

1. Tap ☰ → Plugins
2. Install:
   - **Terminal** - Run commands from Acode
   - **Git** - Git integration
   - **Prettier** - Code formatter
   - **Emmet** - HTML/CSS shortcuts

---

## 📝 Step 5: Typical Development Session

### Example Workflow

1. **Start Termux:**
   ```bash
   cd ~/storage/shared/Documents/github-projects/MarkusBitterman.github.io
   npm start
   ```

2. **Open Acode:**
   - Open your project folder
   - Edit files (pages, posts, styles)
   - Changes auto-save and trigger rebuild

3. **View in Browser:**
   - Open Chrome/Firefox
   - Go to `http://localhost:8080`
   - See your changes live!

4. **Commit Changes (in Termux):**
   ```bash
   # Stop dev server (Ctrl+C)
   git status
   git add .
   git commit -m "Add new blog post"
   git push
   ```

---

## 📱 Useful Tips for Mobile Development

### Termux Shortcuts

- **Ctrl key:** Volume Down
- **Alt key:** Volume Down + another key
- **Extra keys bar:** Swipe keyboard area

### Acode Tips

- **Quick actions:** Long press file/folder
- **Split screen:** Open multiple files side-by-side
- **Search in files:** ☰ → Search (or Ctrl+Shift+F)
- **Command palette:** Ctrl+Shift+P

### Battery Optimization

To prevent Termux from being killed:

1. Go to Android Settings
2. Apps → Termux → Battery
3. Select "Unrestricted" or "Don't optimize"

### Working with Split Screen

1. Enable split screen in Android
2. Put Termux on top (for terminal)
3. Put Acode on bottom (for editing)
4. Or use browser + Acode for live preview

---

## 🎯 Common Tasks

### Create a New Blog Post

```bash
# In Acode, create: src/posts/my-new-post.md
```

```markdown
---
title: "My New Post"
date: 2026-01-28
layout: layouts/post.njk
description: "Post description"
tags:
  - posts
  - tutorial
---

## Your Content Here

Write in Markdown!
```

The dev server will automatically detect and build it.

### Change Site Colors

Edit `src/styles/main.scss` in Acode:

```scss
$primary: #ff6b6b;  // Change primary color
$link: #3273dc;     // Change link color
```

Save → Build automatically → Refresh browser

### Add a New Page

1. Create `src/pages/my-page.md`
2. Add front matter and content
3. Update navbar in `src/_includes/partials/navbar.njk`

---

## 🔧 Troubleshooting

### Port Already in Use

If you see "Port 8080 already in use":

```bash
# Find the process using the port
# Option 1: Using netstat (usually available)
netstat -tulpn | grep 8080

# Option 2: Install and use lsof
pkg install lsof
lsof -i :8080

# Kill the process (replace <PID> with actual process ID)
kill -9 <PID>

# Or simply use a different port
npx eleventy --serve --port=3000
```

### Out of Memory

If npm install fails:

```bash
# Increase memory limit
export NODE_OPTIONS="--max-old-space-size=2048"
npm install
```

### Termux Can't Find Files

If Termux can't see files created by Acode:

```bash
# Refresh Termux storage
termux-reload-settings
```

### Dev Server Not Accessible

Make sure you're using `localhost` or `127.0.0.1`, not `0.0.0.0`.

### Keyboard Issues in Termux

- Install Hacker's Keyboard from F-Droid for better terminal keys
- Or enable extra keys in Termux settings

---

## 🚀 Deploying from Mobile

### Push to GitHub

```bash
# Make sure all changes are committed
git status

# Add files
git add .

# Commit
git commit -m "Your commit message"

# Push to GitHub
git push
```

Your GitHub Actions workflow will automatically build and deploy!

### Check Deployment Status

Visit your repository on GitHub mobile app or browser:
- Go to the "Actions" tab
- See the deployment status

---

## 📚 Additional Resources

### Termux
- [Termux Wiki](https://wiki.termux.com/)
- [Termux GitHub](https://github.com/termux/termux-app)

### Acode
- [Acode Documentation](https://acode.foxdebug.com/)
- [Acode GitHub](https://github.com/deadlyjack/Acode)

### Mobile Development
- [Working with Git on Mobile](https://dev.to/peterlebrun/mobile-development-4b3g)
- [Coding on Android](https://dev.to/daveanthony1/coding-on-your-android-device-3fhd)

---

## 🎉 Success!

You now have a fully functional development environment on your Android device! 🎊

### What You Can Do:

- ✅ Write blog posts on the go
- ✅ Make design changes
- ✅ Test your site
- ✅ Commit and push changes
- ✅ Deploy automatically

### Workflow Summary:

1. **Termux**: `npm start` (dev server)
2. **Acode**: Edit files
3. **Browser**: View at `localhost:8080`
4. **Termux**: Commit and push
5. **GitHub Actions**: Auto-deploy!

Happy mobile coding! 🚀📱

---

## 💡 Pro Tips

1. **Use bookmarks** in your browser for `localhost:8080`
2. **Keep Termux running** in background while editing
3. **Use Acode's terminal plugin** to run commands without switching apps
4. **Set up GitHub CLI** for easier repo management: `pkg install gh`
5. **Use SSH agent** to avoid re-entering credentials: `eval $(ssh-agent) && ssh-add`

---

*Have questions? Open an issue on GitHub!*

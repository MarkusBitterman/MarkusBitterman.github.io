# Contributing to MarkusBitterman.github.io

Thank you for your interest in contributing! This site is both a personal portfolio and an open-source learning resource. Contributions that improve clarity, fix bugs, or enhance functionality are welcome.

## 🤝 Ways to Contribute

### Report Issues

- **Bugs**: If something isn't working as expected, [open an issue](../../issues/new)
- **Documentation**: Found a typo or unclear explanation? Let us know!
- **Suggestions**: Have ideas for improvements? We'd love to hear them

### Submit Changes

- **Bug fixes**: Direct pull requests for clear bugs are welcome
- **Features**: For new features, please open an issue first to discuss the approach
- **Documentation**: Improvements to guides, comments, and examples are always appreciated

## 🛠️ Development Process

### Getting Started

1. **Fork the repository**

   ```bash
   git clone https://github.com/YOUR_USERNAME/MarkusBitterman.github.io.git
   cd MarkusBitterman.github.io
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm start
   ```

4. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

### Code Style

- **JavaScript**: Use modern ES6+ syntax, prefer `const`/`let` over `var`
- **Nunjucks**: Keep template logic simple, move complexity to front matter
- **Sass**: Follow the NP50 theme's 10-layer structure, use CSS custom properties
- **Markdown**: Follow the existing content structure (front matter + prose)

### Testing Your Changes

Before submitting:

```bash
# Build the site
npm run build

# Check for errors
npm run build:eleventy
npm run build:sass

# Test locally at http://localhost:8080
npm start
```

### Commit Messages

Use clear, descriptive commit messages:

- `fix: Correct shader canvas z-index stacking`
- `feat: Add new tag filtering system`
- `docs: Update GLSL shader documentation`
- `style: Fix margin on .title elements`

## 📋 Pull Request Guidelines

1. **Keep PRs focused**: One feature or fix per PR
2. **Update documentation**: If you change functionality, update relevant docs
3. **Test thoroughly**: Ensure your changes work across pages
4. **Describe your changes**: Explain what you did and why

### PR Checklist

- [ ] Code follows the project's style conventions
- [ ] All tests pass (`npm run build` completes without errors)
- [ ] Documentation is updated if needed
- [ ] Commit messages are clear and descriptive
- [ ] No unrelated changes included

## 🎨 Working with the NP50 Theme

This site uses a custom "Nintendo Power No. 50" theme inspired by the July 1993 magazine. When contributing visual changes:

- **Colors**: Use the existing palette variables from `main.scss`
- **Typography**: Stick with the established font hierarchy
- **Components**: Follow Bulma's component structure
- **Shaders**: New GLSL shaders should include RETRO_LIB and target 0.35× DPR

## 🧪 Working with GLSL Shaders

Each page hero can have a unique WebGL2 fragment shader. Guidelines:

- **Performance**: Keep shaders simple, target 60fps at 0.35× DPR
- **Fallback**: Always ensure CSS gradient fallback looks good
- **Safety**: Avoid rapid flashing or strobing effects
- **Accessibility**: Respect `prefers-reduced-motion`

## 🐛 Bug Reports

A good bug report includes:

1. **Description**: What's wrong?
2. **Steps to reproduce**: How can we see the bug?
3. **Expected behavior**: What should happen?
4. **Actual behavior**: What actually happens?
5. **Environment**: Browser, OS, screen size if relevant

## 💡 Feature Requests

When suggesting features:

1. **Use case**: Why would this be useful?
2. **Proposed solution**: How might it work?
3. **Alternatives**: Are there other ways to solve this?
4. **Impact**: What pages/components would this affect?

## 📜 Content Contributions

Content contributions follow different guidelines:

- **Blog posts**: This is a personal blog, so posts reflect my experiences
- **Technical guides**: Improvements to GETTING_STARTED.md are welcome
- **Documentation**: Corrections and clarifications are always appreciated

## 🎓 Learning & Teaching

This project is designed to be:

- **Inspectable**: Code should be readable and well-commented
- **Forkable**: Easy to clone and customize
- **Learnable**: Documentation teaches by example

When contributing, consider how your changes serve these goals.

## 📞 Questions?

- **Issues**: [GitHub Issues](../../issues) for bugs and features
- **Discussions**: [GitHub Discussions](../../discussions) for questions
- **Email**: See the [About page](https://markusbitterman.github.io/about/) for contact info

## 📄 License

By contributing, you agree that your contributions will be licensed under the same [MIT License](LICENSE) that covers this project.

---

**Thank you for making this project better!** Every contribution, no matter how small, helps improve this resource for everyone.

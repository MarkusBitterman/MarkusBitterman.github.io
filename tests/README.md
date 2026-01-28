# 🧪 Tests

This directory contains automated tests for the GitHub Pages site.

## Test Scripts

### 1. `validate-html.js`

**Purpose:** Validates HTML structure and accessibility of all generated pages.

**What it checks:**
- ✅ Presence of essential HTML tags (`<html>`, `<head>`, `<body>`)
- ✅ Page titles (must exist and not be empty)
- ✅ Character encoding meta tags
- ✅ Viewport meta tags (for mobile responsiveness)
- ✅ Alt text on images (for accessibility)
- ✅ Links with empty href attributes
- ✅ Duplicate IDs (which cause CSS/JS issues)

**Usage:**
```bash
npm run test:html
```

**Environment Variables:**
- `SHOW_WARNINGS=true` - Display validation warnings (not just errors)

### 2. `check-links.js`

**Purpose:** Checks for broken internal links across the site.

**What it checks:**
- ✅ All internal `<a href="">` links
- ✅ CSS stylesheet references
- ✅ Relative links between pages

**What it ignores:**
- External links (http://, https://)
- Email links (mailto:)
- Telephone links (tel:)
- Anchor-only links (#section)
- JavaScript links

**Usage:**
```bash
npm run test:links
```

## Running Tests

### Run All Tests

```bash
npm test
```

This runs:
1. Build verification (ensures site builds successfully)
2. HTML validation
3. Link checking

### Run Individual Tests

```bash
# HTML validation only
npm run test:html

# Link checking only
npm run test:links

# Build verification only
npm run test:build
```

## Test Output

### Success

```
✅ index.html
✅ about/index.html
...
✅ All HTML files passed basic validation!
✅ All internal links are valid!
```

### Failure

When tests fail, you'll see detailed error messages:

```
❌ index.html - 2 error(s)

============================================================
❌ ERRORS:
============================================================

📄 index.html:
  ❌ Missing <title> tag
  ❌ Image missing alt text: /images/logo.png
```

## CI/CD Integration

These tests are automatically run in GitHub Actions on:
- Pull requests
- Pushes to main branch

See `.github/workflows/deploy.yml` for the workflow configuration.

## Adding New Tests

To add a new test:

1. Create a new test file: `tests/my-test.js`

2. Write your test logic:
```javascript
#!/usr/bin/env node
const { glob } = require('glob');
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

3. Add to `package.json`:
```json
"scripts": {
  "test:mytest": "node tests/my-test.js",
  "test": "npm run test:build && npm run test:html && npm run test:links && npm run test:mytest"
}
```

4. Make the script executable (optional):
```bash
chmod +x tests/my-test.js
```

## Best Practices

### Test Early, Test Often

Run tests:
- Before committing changes
- After adding new content
- After modifying templates
- Before deploying

### Fix Errors, Review Warnings

- **Errors** (❌) will cause tests to fail - fix these immediately
- **Warnings** (⚠️) are suggestions - review and fix when appropriate

### Test in CI

Let GitHub Actions run tests automatically:
- Catches issues before they reach production
- Ensures all PRs pass tests
- Provides visibility into test results

## Troubleshooting

### "No HTML files found"

**Cause:** Site hasn't been built yet.

**Solution:**
```bash
npm run build
npm test
```

### Tests pass locally but fail in CI

**Possible causes:**
- Different Node.js version
- Missing dependencies
- Environment-specific issues

**Solution:**
- Check CI logs for specific errors
- Ensure `package.json` dependencies are complete
- Test with the same Node.js version as CI

### False positives in link checker

**Cause:** Link checker might not handle all URL formats.

**Solution:**
- Review the specific broken link
- If it's a valid link, update the checker logic in `check-links.js`
- Consider adding to an ignore list if needed

## Dependencies

Tests use these npm packages:
- **glob** - File pattern matching
- **cheerio** - HTML parsing and querying
- **fs/path** - File system operations (Node.js built-ins)

No external validation services required - all tests run locally!

## Resources

- [HTML Best Practices](https://github.com/hail2u/html-best-practices)
- [Web Accessibility Guidelines (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)
- [SEO Best Practices](https://developers.google.com/search/docs/beginner/seo-starter-guide)

---

**Questions?** Open an issue or check [CONTRIBUTING.md](../CONTRIBUTING.md) for more information.

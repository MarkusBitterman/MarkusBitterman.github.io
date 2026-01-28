#!/usr/bin/env node

/**
 * Link Checker Test
 * Checks for broken internal links in the generated site
 */

const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const siteDir = path.join(__dirname, '..', '_site');

async function checkLinks() {
  console.log('🔗 Checking for broken links...\n');

  // Find all HTML files
  const htmlFiles = await glob('**/*.html', { 
    cwd: siteDir,
    absolute: true 
  });

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found. Did you run `npm run build` first?');
    process.exit(1);
  }

  console.log(`Scanning ${htmlFiles.length} HTML files for links.\n`);

  // Build a set of all pages that exist
  const existingPages = new Set();
  htmlFiles.forEach(file => {
    const relativePath = path.relative(siteDir, file);
    existingPages.add('/' + relativePath);
    // Also add without index.html
    if (relativePath.endsWith('index.html')) {
      existingPages.add('/' + relativePath.replace(/index\.html$/, ''));
      existingPages.add('/' + relativePath.replace(/\/index\.html$/, '/'));
    }
  });

  // Also check for CSS files
  const cssFiles = await glob('**/*.css', { 
    cwd: siteDir,
    absolute: true 
  });
  cssFiles.forEach(file => {
    const relativePath = path.relative(siteDir, file);
    existingPages.add('/' + relativePath);
  });

  let brokenLinks = [];
  let totalLinksChecked = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const $ = cheerio.load(html);
    const relativePath = path.relative(siteDir, file);

    // Check all internal links
    $('a[href]').each((_, el) => {
      const href = $(el).attr('href');
      
      // Skip external links, anchors, and special protocols
      if (!href || 
          href.startsWith('http://') || 
          href.startsWith('https://') || 
          href.startsWith('mailto:') ||
          href.startsWith('tel:') ||
          href.startsWith('#') ||
          href.startsWith('javascript:')) {
        return;
      }

      totalLinksChecked++;

      // Remove hash/anchor from href
      const hrefWithoutAnchor = href.split('#')[0];
      
      if (!hrefWithoutAnchor) {
        return; // Just an anchor link
      }

      // Check if the link exists
      const linkExists = existingPages.has(hrefWithoutAnchor) ||
                        existingPages.has(hrefWithoutAnchor + '/') ||
                        existingPages.has(hrefWithoutAnchor + 'index.html');

      if (!linkExists) {
        brokenLinks.push({
          file: relativePath,
          link: href,
          text: $(el).text().trim().substring(0, 50)
        });
      }
    });

    // Check CSS links
    $('link[rel="stylesheet"][href]').each((_, el) => {
      const href = $(el).attr('href');
      
      if (!href || href.startsWith('http://') || href.startsWith('https://')) {
        return;
      }

      totalLinksChecked++;

      if (!existingPages.has(href)) {
        brokenLinks.push({
          file: relativePath,
          link: href,
          text: '[CSS stylesheet]'
        });
      }
    });
  }

  // Print summary
  console.log('='.repeat(60));
  console.log('📊 Link Check Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Total links checked: ${totalLinksChecked}`);
  console.log(`❌ Broken links found: ${brokenLinks.length}`);

  if (brokenLinks.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('❌ BROKEN LINKS:');
    console.log('='.repeat(60));

    // Group by file
    const linksByFile = {};
    brokenLinks.forEach(item => {
      if (!linksByFile[item.file]) {
        linksByFile[item.file] = [];
      }
      linksByFile[item.file].push(item);
    });

    Object.entries(linksByFile).forEach(([file, links]) => {
      console.log(`\n📄 ${file}:`);
      links.forEach(({ link, text }) => {
        console.log(`  ❌ ${link}`);
        if (text) {
          console.log(`     Text: "${text}"`);
        }
      });
    });

    console.log('\n❌ Link check failed!');
    process.exit(1);
  }

  console.log('\n✅ All internal links are valid!');
}

checkLinks().catch(err => {
  console.error('❌ Link check failed:', err);
  process.exit(1);
});

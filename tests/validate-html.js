#!/usr/bin/env node

/**
 * HTML Validation Test
 * Performs basic HTML structure validation checks
 */

const { glob } = require('glob');
const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const siteDir = path.join(__dirname, '..', '_site');

async function validateHTML() {
  console.log('🔍 Validating HTML files...\n');

  // Find all HTML files
  const htmlFiles = await glob('**/*.html', { 
    cwd: siteDir,
    absolute: true 
  });

  if (htmlFiles.length === 0) {
    console.error('❌ No HTML files found. Did you run `npm run build` first?');
    process.exit(1);
  }

  console.log(`Found ${htmlFiles.length} HTML files to validate.\n`);

  let errors = [];
  let warnings = [];
  let successCount = 0;

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(siteDir, file);
    const $ = cheerio.load(html);
    
    const fileErrors = [];
    const fileWarnings = [];

    // Check for basic HTML structure
    if ($('html').length === 0) {
      fileErrors.push('Missing <html> tag');
    }
    
    if ($('head').length === 0) {
      fileErrors.push('Missing <head> tag');
    }
    
    if ($('body').length === 0) {
      fileErrors.push('Missing <body> tag');
    }

    // Check for title
    if ($('title').length === 0) {
      fileErrors.push('Missing <title> tag');
    } else if ($('title').text().trim() === '') {
      fileWarnings.push('Empty <title> tag');
    }

    // Check for charset
    if ($('meta[charset]').length === 0) {
      fileWarnings.push('Missing charset meta tag');
    }

    // Check for viewport meta tag
    if ($('meta[name="viewport"]').length === 0) {
      fileWarnings.push('Missing viewport meta tag (important for mobile)');
    }

    // Check for images without alt text
    $('img').each((_, el) => {
      if (!$(el).attr('alt')) {
        fileWarnings.push(`Image missing alt text: ${$(el).attr('src') || '(no src)'}`);
      }
    });

    // Check for links with empty href
    $('a[href=""]').each((_, el) => {
      fileErrors.push('Link with empty href attribute');
    });

    // Check for duplicate IDs
    const ids = {};
    $('[id]').each((_, el) => {
      const id = $(el).attr('id');
      if (ids[id]) {
        fileErrors.push(`Duplicate ID: "${id}"`);
      }
      ids[id] = true;
    });

    if (fileErrors.length > 0) {
      errors.push({ file: relativePath, messages: fileErrors });
      console.log(`❌ ${relativePath} - ${fileErrors.length} error(s)`);
    } else {
      successCount++;
      console.log(`✅ ${relativePath}`);
    }
    
    if (fileWarnings.length > 0) {
      warnings.push({ file: relativePath, messages: fileWarnings });
    }
  }

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 Validation Summary:');
  console.log('='.repeat(60));
  console.log(`✅ Valid files: ${successCount}/${htmlFiles.length}`);
  console.log(`❌ Files with errors: ${errors.length}`);
  console.log(`⚠️  Files with warnings: ${warnings.length}`);

  // Print errors
  if (errors.length > 0) {
    console.log('\n' + '='.repeat(60));
    console.log('❌ ERRORS:');
    console.log('='.repeat(60));
    errors.forEach(({ file, messages }) => {
      console.log(`\n📄 ${file}:`);
      messages.forEach(msg => {
        console.log(`  ❌ ${msg}`);
      });
    });
  }

  // Print warnings (optional, not counted as failures)
  if (warnings.length > 0 && process.env.SHOW_WARNINGS === 'true') {
    console.log('\n' + '='.repeat(60));
    console.log('⚠️  WARNINGS:');
    console.log('='.repeat(60));
    warnings.forEach(({ file, messages }) => {
      console.log(`\n📄 ${file}:`);
      messages.slice(0, 5).forEach(msg => {
        console.log(`  ⚠️  ${msg}`);
      });
      if (messages.length > 5) {
        console.log(`  ... and ${messages.length - 5} more warnings`);
      }
    });
  }

  // Exit with error if there are any errors
  if (errors.length > 0) {
    console.log('\n❌ HTML validation failed!');
    process.exit(1);
  }

  console.log('\n✅ All HTML files passed basic validation!');
  if (warnings.length > 0) {
    console.log(`⚠️  Note: ${warnings.length} file(s) have warnings. Set SHOW_WARNINGS=true to see them.`);
  }
}

validateHTML().catch(err => {
  console.error('❌ Validation failed:', err);
  process.exit(1);
});

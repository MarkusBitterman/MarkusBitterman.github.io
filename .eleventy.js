module.exports = function(eleventyConfig) {
  // Copy static assets to output
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("CNAME");
  
  // Watch Sass files for changes (Eleventy will trigger rebuild)
  eleventyConfig.addWatchTarget("src/styles/");
  
  // Add a collection for blog posts
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/*.md").sort((a, b) => {
      return b.date - a.date; // Sort by date, newest first
    });
  });
  
  // Add date filters for formatting
  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return dateObj.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  });
  
  eleventyConfig.addFilter("isoDate", (dateObj) => {
    return dateObj.toISOString();
  });
  
  // Add a filter to get excerpt from content
  eleventyConfig.addFilter("excerpt", (content) => {
    const excerpt = content.substring(0, 200);
    return excerpt + (content.length > 200 ? '...' : '');
  });
  
  // Add a filter to get the current year
  eleventyConfig.addFilter("currentYear", () => {
    return new Date().getFullYear();
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
};

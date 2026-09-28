const YAML = require("yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => YAML.parse(contents));
  eleventyConfig.addFilter("entriesByNewestYear", (entries) =>
    Object.entries(entries).sort(([firstYear], [secondYear]) => Number(secondYear) - Number(firstYear)),
  );
  eleventyConfig.addPassthroughCopy({ "web/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "web/favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "web/site.css": "site.css" });
  eleventyConfig.addPassthroughCopy({ "web/site.js": "site.js" });

  return {
    dir: {
      input: "content",
      includes: "_includes",
      data: "_data",
      output: "dist"
    },
    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "liquid"
  };
};

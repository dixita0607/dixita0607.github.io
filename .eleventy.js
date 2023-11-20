const yaml = require("js-yaml");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "./src/assets": "assets",
    ".domains": ".domains",
  });
  eleventyConfig.addWatchTarget("./src/sass");

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    const date = new Date(dateObj);
    return date.toISOString().slice(0, 10);
  });

  eleventyConfig.addPlugin(syntaxHighlight);

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

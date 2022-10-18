const yaml = require("js-yaml");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "./src/assets": "assets",
    ".domains": ".domains",
  });
  eleventyConfig.addWatchTarget("./src/sass");
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

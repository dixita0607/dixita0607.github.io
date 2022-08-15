module.exports = function (eleventyConfig) {
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

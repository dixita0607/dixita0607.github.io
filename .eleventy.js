module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/assets");
  eleventyConfig.addWatchTarget("./src/sass");
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

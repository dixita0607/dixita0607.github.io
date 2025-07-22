const yaml = require("js-yaml");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  eleventyConfig.addPassthroughCopy({
    "./src/assets": "assets",
    ".htaccess": ".htaccess",
  });
  eleventyConfig.addWatchTarget("./src/sass");

  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    if (dateObj) {
      const date = new Date(dateObj);
      return date.toISOString().slice(0, 10);
    }
  });
  eleventyConfig.addFilter("taglist", (collection) => {
    let tagSet = new Set();
    for (let item of collection) {
      (item.data.tags || []).forEach((tag) => tagSet.add(tag));
    }
    return Array.from(tagSet);
  });
  eleventyConfig.addFilter("filterTagList", (tags) =>
    (tags || []).filter(
      (tag) => ["all", "nav", "post", "posts"].indexOf(tag) === -1
    )
  );

  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};

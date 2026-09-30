const YAML = require('yaml');
const markdownIt = require('markdown-it');

module.exports = function (eleventyConfig) {
  const markdownLibrary = markdownIt({ html: true, linkify: true, typographer: true });
  markdownLibrary.renderer.rules.fence = (tokens, index) => {
    const token = tokens[index];
    const language =
      token.info
        .trim()
        .split(/\s+/)[0]
        .replace(/[^a-z0-9_-]/gi, '') || 'text';
    const code = markdownLibrary.utils.escapeHtml(token.content);

    return `<pre class="code-block" data-language="${language}"><code class="language-${language}">${code}</code></pre>\n`;
  };

  eleventyConfig.setLibrary('md', markdownLibrary);
  eleventyConfig.addDataExtension('yaml', (contents) => YAML.parse(contents));
  eleventyConfig.addFilter('entriesByNewestYear', (entries) =>
    Object.entries(entries).sort(
      ([firstYear], [secondYear]) => Number(secondYear) - Number(firstYear),
    ),
  );
  eleventyConfig.addPassthroughCopy({ 'web/assets': 'assets' });
  eleventyConfig.addPassthroughCopy({ 'web/site.css': 'site.css' });
  eleventyConfig.addPassthroughCopy({ 'web/site.js': 'site.js' });

  return {
    dir: {
      input: 'content',
      includes: '_includes',
      data: '_data',
      output: 'dist',
    },
    markdownTemplateEngine: 'liquid',
    htmlTemplateEngine: 'liquid',
  };
};

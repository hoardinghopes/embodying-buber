const htmlmin = require("html-minifier");

const minifyHTML = function (content, outputPath) {
  if (outputPath.endsWith(".html")) {
    console.log(`minifying ${outputPath}`);
    return minify(content);
  }
  return content;
};

const minify = function (content) {
  let minified = htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true,
  });
  return minified;
};

module.exports = { minify, minifyHTML };

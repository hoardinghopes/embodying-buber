const htmlmin = require("html-minifier");

function minify(content) {
  const minified = htmlmin.minify(content, {
    useShortDoctype: true,
    removeComments: true,
    collapseWhitespace: true
  });
  return minified;
}

function minifyHTML(content, outputPath) {
  if (outputPath.endsWith(".html")) {
    // console.log(`minifying ${outputPath}`);
    return minify(content);
  }
  return content;
}

module.exports = { minify, minifyHTML };

const htmlmin = require("./src/_11ty/minify-html.js");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const isDev = process.env.APP_ENV === "development";
const manifest = require("./src/data/manifest");
const markdownIt = require("markdown-it");
const mdFootnotes = require("markdown-it-footnote");
const mdExternalLinks = require("markdown-it-external-links");
const { minify } = require("terser");
const charts = require("eleventy-charts");
const criticalCss = require("eleventy-critical-css");
const filters = require("./src/_11ty/filters");
const shortcodes = require("./src/_11ty/shortcodes");

module.exports = function (eleventyConfig) {
  // Filters
  Object.keys(filters).forEach((filterName) => {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  });

  // Shortcodes
  Object.keys(shortcodes).forEach((shortcodeName) => {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  });

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(charts);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/static/": "/" });

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async function (code, callback) {
      try {
        const minified = await minify(code);
        callback(null, minified.code);
      } catch (err) {
        console.error("Terser error: ", err);
        // Fail gracefully.
        callback(null, code);
      }
    }
  );

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAllSorted().forEach(function (item) {
      if ("tags" in item.data) {
        let tags = item.data.tags;

        tags = tags.filter(function (item) {
          switch (item) {
            case "all":
            case "nav":
            case "post":
            case "posts":
            case "summary":
            case "summaries":
              return false;
          }
          return true;
        });

        for (const tag of tags) {
          tagSet.add(tag);
        }
      }
    });
    return [...tagSet].sort();
  });

  const markdownLib = markdownIt({
    html: true,
  })
    .use(mdFootnotes)
    .use(mdExternalLinks, {
      externalClassName: "external",
      externalRel: "noopener noreferrer external",
      externalTarget: "_blank",
    });
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.setBrowserSyncConfig({
    files: [manifest.path],
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("public/404.html");
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      },
    },
  });

  if (!isDev) {
    eleventyConfig.addTransform("htmlmin", htmlmin.minifyHTML);
    eleventyConfig.addPlugin(criticalCss, { minify: true });
  }

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "includes",
      data: "data",
      layouts: "layouts",
      passthroughFileCopy: true,
      templateFormats: ["html", "njk", "md"],
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk",
    },
  };
};

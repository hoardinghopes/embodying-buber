const htmlmin = require("./src/_11ty/minify-html.js");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const isDev = process.env.APP_ENV === "development";
const manifest = require("./src/data/manifest");
const { minify } = require("terser");
const charts = require("eleventy-charts");
const criticalCss = require("eleventy-critical-css");
const filters = require("./src/_11ty/filters");
const shortcodes = require("./src/_11ty/shortcodes");
const markdownLib = require("./src/_11ty/markdownLib");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const site = require("./src/data/site.js");

module.exports = function (eleventyConfig) {
  eleventyConfig.setLibrary("md", markdownLib.getMarkdownLib());

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
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/static/": "/" });
  eleventyConfig.addPassthroughCopy({ "src/notes/assets/": "/assets/" });

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

  eleventyConfig.addCollection("notes", function (collection) {
    let notes = new Set();
    collection.getAllSorted().forEach(function (item) {
      if ("note" === item.data.type) {
        if (site.isDev) {
          notes.add(item);
        } else {
          if (!item.data.draft) {
            notes.add(item);
          }
        }
      }
    });
    return [...notes].sort();
  });

  eleventyConfig.addCollection("twenty8days", function (collection) {
    let notes = new Set();
    collection.getAllSorted().forEach(function (item) {
      if (!item.data.draft && !site.isDev) {
        if (item.data["28d"]) {
          notes.add(item);
        }
      }
    });
    return [...notes].sort();
  });

  eleventyConfig.addCollection("tagList", function (collection) {
    let tagSet = new Set();
    collection.getAllSorted().forEach(function (item) {
      if (!item.data.draft && !site.isDev) {
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
      }
    });
    return [...tagSet].sort();
  });

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

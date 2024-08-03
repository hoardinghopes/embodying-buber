const fs = require("node:fs");
const htmlmin = require("./src/_11ty/minify-html.js");
const purgeCssPlugin = require("eleventy-plugin-purgecss");
const readingTime = require("eleventy-plugin-reading-time");
const { minify } = require("terser");
const filters = require("./src/_11ty/filters");
const shortcodes = require("./src/_11ty/shortcodes");
const markdownLib = require("./src/_11ty/markdownLib");
const env = require("./src/data/env.js");

console.log("development environment:", env.IS_DEV)

module.exports = (eleventyConfig) => {
  eleventyConfig.setLibrary("md", markdownLib.getMarkdownLib());

  // Filters
  for (const filterName of Object.keys(filters)) {
    eleventyConfig.addFilter(filterName, filters[filterName]);
  }

  // Shortcodes
  for (const shortcodeName of Object.keys(shortcodes)) {
    eleventyConfig.addShortcode(shortcodeName, shortcodes[shortcodeName]);
  }

  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(readingTime);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/static/": "/" });

  eleventyConfig.addNunjucksAsyncFilter(
    "jsmin",
    async (code, callback) => {
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

  eleventyConfig.addCollection("posts", (collection) => {
    const set = new Set();
    for (const item of collection.getAllSorted()) {
      if (item.data["28d"]) {
        if (env.IS_DEV) {
          set.add(item);
        } else {
          if (!item.data.draft) {
            set.add(item);
          }
        }
      }
    }
    return [...set].sort();
  });

  eleventyConfig.addCollection("tagList", (collection) => {
    const tagSet = new Set();
    for (const item of collection.getAllSorted()) {
      if (!item.data.draft && !env.IS_DEV) {
        if ("tags" in item.data) {
          let tags = item.data.tags;

          tags = tags.filter((item) => {
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
    }
    return [...tagSet].sort();
  });

  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: (err, bs) => {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync("_site/404.html");
          // Add 404 http status code in request header.
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          // Provides the 404 content without redirect.
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  if (!env.IS_DEV) {
    // Minify HTML & CSS when building for production
    eleventyConfig.addTransform("htmlmin", htmlmin.minifyHTML);
    eleventyConfig.addPlugin(purgeCssPlugin, {
      config: "./purgecss.config.js",
      quiet: false,
    });
  }

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "includes",
      data: "data",
      layouts: "layouts",
      passthroughFileCopy: true,
      templateFormats: ["html", "njk", "md"],
      htmlTemplateEngine: "njk",
      markdownTemplateEngine: "njk"
    }
  };
};

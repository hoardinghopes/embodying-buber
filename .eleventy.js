const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const path = require("path");
const isDev = process.env.APP_ENV === "development";
const site = require("./src/data/site");
const markdownIt = require("markdown-it");
const mdFootnotes = require("markdown-it-footnote");
const slugify = require("slugify");
const criticalCss = require("eleventy-critical-css");

const manifestPath = path.resolve(
  __dirname,
  "public",
  "assets",
  "manifest.json"
);

const manifest = isDev
  ? {
      "main.js": "/assets/main.js",
      "main.css": "/assets/main.css",
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });
  // eleventyConfig.addPassthroughCopy({
  //   "./node_modules/alpinejs/dist/alpine.js": "/assets/alpine.js",
  // });

  eleventyConfig.addShortcode("bundledcss", function () {
    return manifest["main.css"]
      ? `<link href="${manifest["main.css"]}" rel="stylesheet" />`
      : "";
  });

  eleventyConfig.addShortcode("version", function () {
    return String(Date.now());
  });

  eleventyConfig.addShortcode("bundledjs", function () {
    return manifest["main.js"]
      ? `<script src="${manifest["main.js"]}"></script>`
      : "";
  });

  eleventyConfig.addShortcode("clickystats", function () {
    if (!isDev) {
      if (site.clickystats.install) {
        return site.clickystats.script;
      }
    }
    return "";
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = clean(post);
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("wordCount", (post) => {
    // this is filtering the HTML, not the markdown
    const content = clean(post);
    return content.split(" ").length;
  });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy"
    );
  });

  eleventyConfig.addFilter("readableDateTime", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(
      "dd LLL yyyy, HH:mm"
    );
  });

  eleventyConfig.addFilter("nbsp", (data) => {
    return data.split(" ").join("&nbsp;");
  });

  eleventyConfig.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter("head", (array, n) => {
    if (n < 0) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  eleventyConfig.addFilter("pageTags", (tags) => {
    const generalTags = ["all", "nav", "post", "posts"];

    return tags
      .toString()
      .split(",")
      .filter((tag) => {
        return !generalTags.includes(tag);
      });
  });

  eleventyConfig.addFilter("slug", (str) => {
    return slugify(str, {
      replacement: "-",
      // the default slugify filter doesn't remove these characters
      remove: /[&,+()$~%.'":*?<>{}]/g,
      lower: true,
    });
  });

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

  const markdownLib = markdownIt({ html: true }).use(mdFootnotes);
  eleventyConfig.setLibrary("md", markdownLib);

  eleventyConfig.setBrowserSyncConfig({
    files: [manifestPath],
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
    eleventyConfig.addTransform(
      "htmlmin",
      require("./src/utils/minify-html.js")
    );
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

const clean = function (post) {
  // this is filtering the HTML, not the markdown
  let content = post.replace(/(<([^>]+)>)/gi, ""); //remove tags
  content = content.replace("tl;dr", ""); // remove tl;dr
  content = content.replace(/([\[\d\]]*)/g, ""); // remove any footnote remnants
  return content;
};

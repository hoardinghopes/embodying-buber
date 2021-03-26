const CleanCSS = require("clean-css");
const { DateTime } = require("luxon");
const readingTime = require("eleventy-plugin-reading-time");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const path = require("path");
const isDev = process.env.APP_ENV === "development";
const site = require("./src/data/site");
const manifest = require("./src/data/manifest");
const markdownIt = require("markdown-it");
const mdFootnotes = require("markdown-it-footnote");
const mdExternalLinks = require("markdown-it-external-links");
const slugify = require("slugify");
const criticalCss = require("eleventy-critical-css");
const { minify } = require("terser");
const charts = require("eleventy-charts");

module.exports = function (eleventyConfig) {
  eleventyConfig.setUseGitIgnore(false);

  eleventyConfig.addPlugin(charts);
  eleventyConfig.addPlugin(readingTime);
  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.setDataDeepMerge(true);
  eleventyConfig.addPassthroughCopy({ "src/static/": "/" });

  eleventyConfig.addShortcode("bundledcss", function (headOrFoot) {
    let styles = manifest.getStyles();
    return `<link href="${styles}" ${headOrFoot == "head" ? 'rel="preload" as="style"' : 'rel="stylesheet"'}>`;
  });

  eleventyConfig.addShortcode("bundledjs", function (which) {
    let script = manifest.getScripts(which);
    if (script) {
      return `<script src="${script}" ${
        which !== "main" ? "defer" : ""
      }></script>`;
    } else {
      console.error(
        `ERROR: no '${which}' script found (.eleventy.js 'bundledjs' shortcode)`
      );
      return "";
    }
  });

  eleventyConfig.addShortcode("clickystats", function () {
    if (!isDev) {
      if (site.clickystats.install) {
        return site.clickystats.script;
      }
    }
    return "";
  });

  eleventyConfig.addFilter("cssmin", function (code) {
    return new CleanCSS({}).minify(code).styles;
  });

  eleventyConfig.addFilter("excerpt", (post) => {
    const content = clean(post);
    return content.substr(0, content.lastIndexOf(" ", 200)) + "...";
  });

  eleventyConfig.addFilter("jsonmin", (input) => {
    return JSON.stringify(JSON.parse(input));
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

  eleventyConfig.addFilter("ms", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toMillis();
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

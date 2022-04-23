const gitinfo = require("../data/gitinfo");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  layout: "summary",
  tags: ["summary"],
  permalink: "/summaries/{{title | slug}}/index.html",
  draft: true,
  type: "summary",
  eleventyComputed: {
    banner: () => {
      return false;
    },
    /* permalink: (data) => {
      if (isDev) {
        return data.permalink;
      } else {
        return data.draft ? "" : data.permalink;
      }
    }, */
    eleventyExcludeFromCollections: (data) => {
      return isDev ? false : data.draft;
    },
    numberedTitle: (data) => {
      const parts = data.page.fileSlug.split("-");
      const num = parts[parts.length - 1];
      return `${num}: ${data.title}`;
    },
    lastModified: (data) => {
      return gitinfo.lastModified(data.page.inputPath);
    }
  }
};

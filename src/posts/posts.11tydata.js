const gitinfo = require("../data/gitinfo");
const images = require("../data/images");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  layout: "post",
  tags: ["posts"],
  permalink: "posts/{{title | slug}}/index.html",
  draft: false,
  type: "post",
  eleventyComputed: {
    banner: (data) => {
      return images[data.page.fileSlug];
    },
    permalink: (data) => {
      if (isDev) {
        return data.permalink;
      } else {
        return data.draft ? "" : data.permalink;
      }
    },
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
    },
    abbrevHash: (data) => {
      return gitinfo.abbrevHash;
    },
    authorDate: (data) => {
      return gitinfo.authorDate;
    },
    authorName: (data) => {
      return gitinfo.authorName;
    },
    subject: (data) => {
      return gitinfo.subject;
    },
  },
};

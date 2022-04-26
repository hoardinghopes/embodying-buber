const slugify = require("slugify");
const gitinfo = require("../../data/gitinfo");
const images = require("../../data/images");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  layout: "post",
  tags: ["posts"],
  permalink: "{{title | slug}}/index.html",
  draft: false,
  type: "post",
  eleventyComputed: {
    banner: (data) => {
      const key = slugify(data.page.fileSlug).toLowerCase();
      if (images[key]) {
        return images[key];
      }
      return { src: "", thumb: "", attribute: "" };
    },
    permalink: (data) => {
      if (isDev) {
        return data.permalink;
      }
      return data.draft ? "" : data.permalink;
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
    abbrevHash: () => {
      return gitinfo.abbrevHash;
    },
    authorDate: () => {
      return gitinfo.authorDate;
    },
    authorName: () => {
      return gitinfo.authorName;
    },
    subject: () => {
      return gitinfo.subject;
    }
  }
};

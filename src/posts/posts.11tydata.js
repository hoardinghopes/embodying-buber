const slugify = require("slugify");
const gitinfo = require("../data/gitinfo");
const images = require("../data/images");
const env = require("../data/env");

module.exports = {
  layout: "post",
  tags: ["posts"],
  permalink: "{{title | slug}}/index.html",
  draft: false,
  type: "post",
  status: "seedling",
  eleventyComputed: {
    banner: (data) => {
      const key = slugify(data.page.fileSlug).toLowerCase();
      if (images[key]) {
        return images[key];
      }
      return { src: "", thumb: "", attribute: "" };
    },
    permalink: (data) => {
      if (env.IS_DEV) {
        return data.permalink;
      }
      return data.draft ? "" : data.permalink;
    },
    eleventyExcludeFromCollections: (data) => {
      return env.IS_DEV ? false : data.draft;
    },
    numberedTitle: (data) => {
      return `${data['28d']}: ${data.title}`;
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

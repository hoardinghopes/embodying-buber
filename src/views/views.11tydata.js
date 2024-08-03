const images = require("../data/images");
const gitinfo = require("../data/gitinfo");
const env = require("../data/env");

module.exports = {
  type: "other",
  permalink: "/{{title | slug}}/index.html",
  eleventyComputed: {
    banner: (data) => {
      return images[data.page.fileSlug];
    },
    isDev: () => {
      return env.IS_DEV;
    },
    lastModified: (data) => {
      return gitinfo.lastModified(data.page.inputPath);
    }
  }
};

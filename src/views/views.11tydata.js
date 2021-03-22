const images = require("../data/images");
const gitinfo = require("../data/gitinfo");
const isDev = process.env.APP_ENV === "development";

module.exports = {
  permalink: "/{{title | slug}}/index.html",
  eleventyComputed: {
    banner: (data) => {
      return images[data.page.fileSlug];
    },

    lastModified: (data) => {
      const lm = gitinfo.lastModified(data.page.inputPath);
      console.log(`${data.page.inputPath}: ${lm}`);
      return lm;
    },
  },
};

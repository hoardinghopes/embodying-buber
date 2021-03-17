const images = require("../data/images");

const isDev = process.env.APP_ENV === "development";

module.exports = {
  permalink: "/{{title | slug}}/index.html",
  eleventyComputed: {
    banner: (data) => {
      return images[data.page.fileSlug];
    },
  },
};

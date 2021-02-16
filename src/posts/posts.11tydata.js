module.exports = {
  layout: "post",
  tags: ["posts"],
  epistemic: {
    status: "1. not sure of this yet, early rumblings only",
    effort: "1. flippant thought, thrown down"
  },
  permalink: "posts/{{title | slug}}/index.html",
  draft: false,
  eleventyComputed: {
    permalink: data => {
      if (process.env.ELEVENTY_ENV !== "production") {
        return data.permalink;
      } else {
        return data.draft ? false : data.permalink;
      }
    },
    eleventyExcludeFromCollections: data => {
      return process.env.ELEVENTY_ENV !== "production" ? false : data.draft;
    },
    numberedTitle: data => {
      const parts = data.page.fileSlug.split("-");
      const num = parts[parts.length - 1];
      return `${num}: ${data.title}`;
    }
  }
};

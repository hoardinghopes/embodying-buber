const _ = require("lodash");

// This regex finds all wikilinks in a string
const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

function titleToFilePathCompare(link, fileSlug) {
  // console.log(
  //   `comparing with ${_.kebabCase(link)} === ${_.kebabCase(fileSlug)}`
  // );
  return _.kebabCase(link) === _.kebabCase(fileSlug);
}

module.exports = {
  layout: "note",
  tags: ["notes"],
  permalink: "notes/{{title | slug}}/index.html",
  draft: false,
  type: "note",
  eleventyComputed: {
    backlinks: (data) => {
      const notes = data.collections.notes;
      const currentFileSlug = data.page.fileSlug;
      // console.log(`currentFileSlug: ${currentFileSlug}`);
      // console.log(`filePathStem: ${data.page.filePathStem}`);

      let backlinks = [];

      // Search the other notes for backlinks
      for (const otherNote of notes) {
        if (otherNote.fileSlug === currentFileSlug) {
          continue;
        }
        const noteContent = otherNote.template.frontMatter.content;

        // Get all links from otherNote
        const outboundLinks = (noteContent.match(wikilinkRegExp) || []).map(
          (link) => {
            // Extract link location
            return link
              .slice(2, -2)
              .split("|")[0]
              .replace(/.(md|markdown)\s?$/i, "")
              .trim();
          }
        );
        // If the other note links here, return related info
        if (
          outboundLinks.some((link) => {
            let found = titleToFilePathCompare(link, currentFileSlug);
            // console.log(`found: ${found}`);
            return found;
          })
        ) {
          backlinks.push({
            url: otherNote.url,
            title: otherNote.data.title,
            preview: noteContent.slice(0, 240),
          });
        }
      }
      // console.log(backlinks.length);
      return backlinks;
    },
  },
};

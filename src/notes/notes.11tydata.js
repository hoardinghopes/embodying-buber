// This regex finds all wikilinks in a string
const wikilinkRegExp = /\[\[\s?([^\[\]\|\n\r]+)(\|[^\[\]\|\n\r]+)?\s?\]\]/g;

function titleToFilePathCompare(link, fileSlug) {
  const hyphenedLink = link.split(" ").join("-");
  return hyphenedLink.toLowerCase() === fileSlug.toLowerCase();
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
          outboundLinks.some((link) =>
            titleToFilePathCompare(link, currentFileSlug)
          )
        ) {
          backlinks.push({
            url: otherNote.url,
            title: otherNote.data.title,
            preview: noteContent.slice(0, 240),
          });
        }
      }
      return backlinks;
    },
  },
};

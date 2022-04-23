const markdownIt = require("markdown-it");
const mdFootnotes = require("markdown-it-footnote");
const mdExternalLinks = require("markdown-it-external-links");
const mdWikiLinks = require("markdown-it-wikilinks");
const sanitize = require("sanitize-filename");

let mdl;

const markdownLib = markdownIt({
  html: true
})
  .use(mdFootnotes)
  .use(mdExternalLinks, {
    externalClassName: "external",
    externalRel: "noopener noreferrer external",
    externalTarget: "_blank"
  })
  .use(
    mdWikiLinks({
      baseURL: "/notes/",
      makeAllLinksAbsolute: true,
      uriSuffix: "/",
      postProcessPageName: (pageName) => {
        let pgn = pageName.trim();
        pgn = pgn.split("/").map(sanitize).join("/");
        pgn = pgn.replace(/\s+/g, "-");
        return pgn.toLowerCase();
      }
    })
  );

markdownLib.renderer.rules.footnote_block_open = () =>
  "<hr>\n" +
  '<section class="footnotes">\n' +
  "<h4>Footnotes</h4>\n" +
  '<ol class="footnotes-list">\n';

function getMarkdownLib() {
  if (!mdl) mdl = markdownLib;

  return mdl;
}

module.exports = { getMarkdownLib };

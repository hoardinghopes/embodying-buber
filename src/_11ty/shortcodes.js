const manifest = require("../data/manifest");
const site = require("../data/site");
const isDev = process.env.APP_ENV === "development";

module.exports = {
  bundledcss: (headOrFoot) => {
    let styles = manifest.getStyles();
    return `<link href="${styles}" ${
      headOrFoot == "head" ? 'rel="preload" as="style"' : 'rel="stylesheet"'
    }>`;
  },

  clickystats: () => {
    if (!isDev) {
      if (site.clickystats.install) {
        return site.clickystats.script;
      }
    }
    return "";
  },

  bundledjs: (which) => {
    let script = manifest.getScripts(which);
    if (script) {
      return `<script src="${script}" ${
        which !== "main.js" ? "defer" : ""
      }></script>`;
    } else {
      console.error(
        `ERROR: no '${which}' script found (.eleventy.js 'bundledjs' shortcode)`
      );
      return "";
    }
  },
};

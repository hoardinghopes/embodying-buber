const manifest = require("../data/manifest");
const site = require("../data/site");
const env = require("../data/env");


module.exports = {
  bundledcss: (type) => {
    const styles = manifest.getStyles();
    return `
    <link rel="preload" href="${styles}" as="style" />
    <link href="${styles}" rel="stylesheet" type="text/css">
    `;
  },

  stats: (which) => {
    if (!env.IS_DEV) {
      if (site.stats[which].install) {
        return site.stats[which].script;
      }
    }
    return "";
  },

  bundledjs: (which) => {
    const script = manifest.getScript();
    if (script) {
      return `<script src="${script}"></script>`;
    }
    throw new Error(
      `ERROR: no '${which}' script found (.eleventy.js 'bundledjs' shortcode)`
    );
  }
};

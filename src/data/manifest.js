const env = require("../data/env");
const path = require("node:path");
const fs = require("node:fs");

const manifestPath = path.resolve(
  __dirname,
  "..",
  "..",
  "_site",
  "mix-manifest.json"
);

const manifest = env.IS_DEV
  ? {
    "/assets/main.js": "/assets/main.js",
    "/assets/styles.css": "/assets/styles.css",
  }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));



function getDetails(data) {
  try {
    if (manifest[data]) return manifest[data];
  }
  catch (error) {
    throw new Error(`no manifest entry found for ${data}`);
  }
}

function getAll() {
  return Object.values(manifest);
}

module.exports = {
  getAll() {
    return getAll();
  },
  getStyles() {
    return getDetails("/assets/styles.css");
  },
  getScript() {
    return getDetails("/assets/main.js");
  },
  path: manifestPath
};

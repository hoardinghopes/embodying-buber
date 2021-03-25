const isDev = process.env.APP_ENV === "development";
const path = require("path");
const fs = require("fs");

const manifestPath = path.resolve(
  __dirname,
  "..",
  "..",
  "public",
  "assets",
  "manifest.json"
);

const manifest = isDev
  ? {
      "main.js": "/assets/main.js",
      "main.css": "/assets/main.css",
    }
  : JSON.parse(fs.readFileSync(manifestPath, { encoding: "utf8" }));

function getDetails(data) {
  console.log(`isDev: ${isDev}`);
  console.log(`retrieving ${data}`);
  console.log(manifest);

  if (data === "style") {
    console.log(manifest["main.css"]);
    return manifest["main.css"];
  } else {
    console.log(manifest["main.js"]);
    return manifest["main.js"];
  }
}
module.exports = {
  getStyles: function () {
    return getDetails("style");
  },
  getScripts: function (which) {
    if (which === "main") return getDetails("js");
  },
  path: manifestPath,
};

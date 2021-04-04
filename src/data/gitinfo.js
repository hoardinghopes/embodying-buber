const gitlog = require("gitlog").default;
const isDev = process.env.APP_ENV === "development";
let details;

const getInfo = function (infoType) {
  if (isDev) return "";

  if (details === undefined) {
    const options = {
      repo: __dirname + "/../../.git", // we're in /src/data/
      number: 1,
      nameStatus: false,
      fields: ["abbrevHash", "subject", "authorName", "authorDate"],
    };
    details = gitlog(options)[0];
    // console.log(details);
  }
  return details[infoType];
};

const getLastModified = function (filePath) {
  // console.log(`getLastModified( ${filePath} )`);
  if (isDev) return "";
  const options = {
    repo: __dirname + "/../../.git", // we're in /src/data/
    number: 1,
    nameStatus: false,
    fields: ["authorDate"],
    file: filePath,
  };
  details = gitlog(options)[0];

  if (details) {
    return details.authorDate;
  } else {
    // console.log("No gitlog authorDate found");
    return "";
  }
};

module.exports = {
  abbrevHash: getInfo("abbrevHash"),
  authorDate: getInfo("authorDate"),
  authorName: getInfo("authorName"),
  subject: getInfo("subject"),
  lastModified: getLastModified,
};

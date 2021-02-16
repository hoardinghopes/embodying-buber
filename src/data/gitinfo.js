const gitlog = require("gitlog").default;

let details;

const getInfo = function(infoType) {
  if (details === undefined) {
    const options = {
      repo: __dirname + "/../../.git", // we're in /src/data/
      number: 1,
      nameStatus: false,
      fields: ["abbrevHash", "subject", "authorName", "authorDate"]
    };
    details = gitlog(options)[0];
    // console.log(details);
  }
  return details[infoType];
};

module.exports = {
  abbrevHash: getInfo("abbrevHash"),
  authorDate: getInfo("authorDate"),
  authorName: getInfo("authorName"),
  subject: getInfo("subject")
};

var fs = require("fs");
var csv = require("csvtojson");
var args = process.argv;
var markdown = require("./src/markdown");

var fileName = "";
if (args.indexOf("-f") > -1) {
  fileName = args[args.indexOf("-f") + 1];
}

const workItemUrl = (id) => {
  return `https://starrepublic.visualstudio.com/DeLaval/_workitems/edit/${id}`;
};

if (fileName) {
  csv()
    .fromFile(fileName)
    .then((jsonArray) => {
      let documentBody = "";

      documentBody += markdown.title("Change log");

      const incidents = jsonArray.filter((item) => {
        return item["Work Item Type"] === "Incident";
      });

      if (incidents.length > 0) {
        documentBody += markdown.title("Incidents", 2);
        incidents.forEach((row) => {
          // Properties: ID, Work Item Type, Title, Assigned To, State, Tags
          documentBody += markdown.title(
            markdown.inlineLink(workItemUrl(row["ID"]), row["Title"]),
            3
          );
        });
      }
      console.log(jsonArray);
      const featuresForUat = jsonArray.filter((item) => {
        return (
          item["Work Item Type"] === "Feature" && item["Acceptance Criteria"]
          // &&
          // item["Acceptance Criteria"].length > 0
        );
      });

      if (featuresForUat.length > 0) {
        documentBody += markdown.title("UAT", 2);
        featuresForUat.forEach((row) => {
          // Properties: ID, Work Item Type, Title, Assigned To, State, Tags
          documentBody += markdown.title(row["Title"], 3);
          documentBody += markdown.plainText(
            markdown.inlineWorkItemLink(row["ID"])
          );
          documentBody += markdown.plainText(row["Acceptance Criteria"]);
        });
      }

      const features = jsonArray.filter((item) => {
        return (
          item["Work Item Type"] === "Feature" && !item["Acceptance Criteria"]
        );
      });

      documentBody += markdown.title("No UAT", 2);
      var bullets = features.map((item) => {
        return markdown.inlineWorkItemLink(item["ID"]); // markdown.inlineLink(workItemUrl(item["ID"]), item["Title"]);
      });
      documentBody += markdown.bulletList(bullets);

      console.log(documentBody);
    });
}

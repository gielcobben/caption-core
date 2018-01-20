const Core = require("./../dist/index");

Core.searchByQuery("Vikings", "eng", 10)
  .on("fastest", results => console.log("Fastest results", results))
  .on("completed", results => console.log("All results", results));

Core.searchByFiles([
  { path: `${__dirname}/../resources/dexter.mp4`, "filename": "dexter.mp4" }
])
  .on("completed", results => console.log("All results", results));

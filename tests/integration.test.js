const CaptionCore = require("./../dist/index");

describe("CaptionCore", () => {
  describe("textSearch", () => {
    it("integrates", () => {
      CaptionCore.searchByQuery("Mr Robot S01e02", "eng")
        .on("fastest", results => {
          console.log("results", results);
        })
        .on("completed", resutls => {
          console.log("completed", results);
        });
    });
  });
});

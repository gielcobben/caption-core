import CaptionCore from "./../dist/index";

describe("CaptionCore", () => {
  describe("textSearch", () => {
    it("integrates", () => {
      CaptionCore.searchByQuery("Mr Robot S01e)2", "eng")
        .on("fastest", results => {
          console.log("results", results);
        })
        .on("completed", resutls => {
          console.log("completed", results);
        });
    });
  });
});

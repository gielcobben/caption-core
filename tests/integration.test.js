const CaptionCore = require("./../dist/index");

describe("CaptionCore", () => {
  describe("textSearch", () => {
    it("retrieves fastests results", done => {
      CaptionCore.searchByQuery("Mr Robot S01E02", "eng").on(
        "fastest",
        results => {
          expect(results).toMatchSnapshot();
          done();
        },
      );
    });
    it("retrieves all results", done => {
      CaptionCore.searchByQuery("Mr Robot S01E02", "eng").on(
        "completed",
        results => {
          expect(results).toMatchSnapshot();
          done();
        },
      );
    });
  });
});

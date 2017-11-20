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
    // it("retrieves all results", done => {
    //   CaptionCore.searchByQuery("Mr Robot S01E02", "eng").on(
    //     "completed",
    //     results => {
    //       expect(results).toMatchSnapshot();
    //       done();
    //     },
    //   );
    // });
  });

  describe("download", () => {
    it("integrates", () => {
      const item = {
        download: {
          distribution: "UNKNOWN",
          lang: "English",
          langId: "eng",
          link: "/original/101990/20",
          referer: "/show/5151",
          team: "SHAANIG",
          version: "SHAANIG",
        },
        extention: "",
        name: "Mr Robot S01E02.UNKNOWN.SHAANIG",
        score: 0,
        size: "",
        source: "addic7ed",
      };
      CaptionCore.download(item, "blah.srt")
        .then(file => console.log("file", file))
        .catch(err => console.log("error", err));
    });
  });
});

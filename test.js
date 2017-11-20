const Core = require("./dist/index");

// Test opensubtitles
Core.download(
  {
    name:
      "Comedians in Cars.eps2.0.unm4sk-pt2.tc.1080p.WEB-DL.DD5.1.H264-NTb.srt",
    downloadUrl:
      "http://dl.opensubtitles.org/en/download/src-api/vrf-19bc0c59/sid-NWi9,PbRu-XVfHuV1OQ5jEwcTHd/filead/1955264178",
    extention: "",
    source: "opensubtitles",
    size: "",
    score: 4,
  },
  "opensubtitles",
  "/Users/vernon/Movies/opensubs.srt",
);

// test addic7ed
Core.download(
  {
    subInfo: {
      distribution: "UNKNOWN",
      lang: "English",
      langId: "eng",
      link: "/updated/1/101990/0",
      referer: "/show/5151",
      team: "KILLERS",
      version: "KILLERS",
    },
    extention: "",
    name: "Mr Robot S01e02.UNKNOWN.KILLERS",
    score: 0,
    size: "",
    source: "addic7ed",
  },
  "addic7ed",
  "/Users/vernon/Movies/addic.srt",
);

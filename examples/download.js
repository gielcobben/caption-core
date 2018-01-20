const Core = require("./../dist/index");

// Download for opensubtitles
Core.download(
  {
    name: "Vikings.S04E03.PROPER.HDTV.x264-KILLERS.srt",
    downloadUrl:
      "https://dl.opensubtitles.org/en/download/src-api/vrf-19a90c51/sid-NLc6F2GB58zJLo-Qd8iaELspR-4/filead/1955117623.gz",
    encoding: "ASCII",
    extention: "",
    source: "opensubtitles",
    size: "",
    score: 4,
  },
  "opensubtitles",
  "/Users/gielcobben/Downloads/opensubtitles.srt",
);

// Download for addic7ed
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
  "/Users/gielcobben/Downloads/addic7ed.srt",
);

Core.download(
  { language: "en", filePath: `${__dirname}/../resources/dexter.mp4` },
  "thesubdb",
  `${__dirname}/../resources/dexter.srt`,
)

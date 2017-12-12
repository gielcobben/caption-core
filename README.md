<h1 align="center">
  <img src="https://gielcobben.com/github/caption-core/icon_256x256.png" width="100" alt="icon" draggable="false"><br>
  Caption Core
  <br>
  <br>
</h1>

<br>

<p align="center">  
  <img src="https://gielcobben.com/github/caption-core/github_cover.png" width="840" alt="banner" draggable="false">
  <br>
  <h6 align="center">INTRODUCTION</h6>
  <p align="center">Download subtitles from multiple sources.</p>
  <p align="center"><a href="https://github.com/gielcobben/caption">View Caption.</a></p>
</p>

<br>

## 🔌 Supported sources:

* [x] opensubtitles
* [x] addic7ed

## 🔎 Search by query

##### Code:

```js
const Caption = require("caption-core");

const ENGLISH = "eng";
const LIMIT = 10;

Caption.searchByQuery("Comedians in Cars", ENGLISH, LIMIT)
  .on("fastest", subtitles => {
    // Fastest source has been checked.
  })
  .on("completed", subtitles => {
    // All sources are checked.
  });
```

##### Output:

```js
[
  {
    name: "Comedians in Cars.HDTV.x264.srt",
    download: "http://dl.opensubtitles.org/en/download/...",
    extention: "",
    source: "opensubtitles",
    size: "",
    score: 4,
  },
  {
    name: "Comedians in Cars.1080p.WEB-DL.H264.srt",
    download: "http://dl.opensubtitles.org/en/download/...",
    extention: "",
    source: "addic7ed",
    size: "",
    score: 3,
  },
];
```

## 🎞 Search by file

##### Code:

```js
const Caption = require("caption-core");

const ENGLISH = "eng";
const LIMIT = 10;

Caption.searchByFile(
    [
      "~/Movies/Comedians in Cars.S01E01.mp4",
      "~/Movies/Comedians in Cars.S01E02.mp4",
    ],
    ENGLISH,
    LIMIT,
  )
  .on("completed", subtitles => {
    // All sources are checked.
  });
```

##### Output:

```js
[
  {
    name: "Comedians in Cars.HDTV.x264.srt",
    download: "http://dl.opensubtitles.org/en/download/...",
    extention: "",
    source: "opensubtitles",
    size: "",
    score: 4,
  },
  {
    name: "Comedians in Cars.1080p.WEB-DL.H264.srt",
    download: "http://dl.opensubtitles.org/en/download/...",
    extention: "",
    source: "addic7ed",
    size: "",
    score: 3,
  },
];
```

## 📺 Download subtitle

##### Code:

```js
const Caption = require("caption-core");

Caption.download(
  {
    name: "Comedians in Cars.HDTV.x264.srt",
    download: "http://dl.opensubtitles.org/en/download/...",
    extention: "",
    source: "opensubtitles",
    size: "",
    score: 4,
  },
  "opensubtitles",
  "~/Movies/Comedians in Cars.S01E01.srt",
);
```

## 🔑 License

[MIT](https://github.com/gielcobben/Caption/blob/master/LICENSE) © Giel Cobben & Vernon de Goede

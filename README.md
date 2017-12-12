<h1 align="center">
  <img src="https://gielcobben.com/github/caption-core/icon_256x256.png" width="100" alt="icon" draggable="false"><br>
  Caption Core
  <br>
  <br>
</h1>

<br>

<p align="center">  
  <img src="https://gielcobben.com/github/caption-core/github_cover.png?v=2" width="840" alt="banner" draggable="false">
  <br>
  <h6 align="center">INTRODUCTION</h6>
  <p align="center">Caption Core acts as an abstraction layer for Caption’s core functionality. This allows third parties to add new sources or update existing ones. By introducing a simple but powerful API, all other modules that rely on Caption’s core will be able to upgrade smoothly.</p>
  <p align="center"><a href="https://github.com/gielcobben/caption">View Caption.</a></p>
</p>

<br>

## 🛠 Install

###### Setup:

```
npm install --save caption-core
```

###### ES6

```js
import Caption from "caption-core";
```

###### CommonJS

```js
const Caption = require("caption-core");
```

<br>

## ⚡️ Contribute

Caption Core is completely open-source. We've tried to make it as easy as possible to
contribute. If you'd like to help out by adding sources or assisting in other parts of development, here's how to get started:

###### To begin working locally:

1. [Fork](https://help.github.com/articles/fork-a-repo/) this repository to your
   own GitHub account
2. [Clone](https://help.github.com/articles/cloning-a-repository/) it to your
   local device: `git clone git@github.com:gielcobben/caption-core.git`
3. Install the dependencies: `npm install`
4. Build the module using Rollup:
   `npm run build`
5. Run one of the examples: `node examples/search.js`.

<br>

## 📦 Sources

Caption currently uses 2 sources to gather subtitles. We're continuously adding
sources, but the app's open-source nature also allows you to add your own when
desired.

###### Standard sources:

* [x] OpenSubtitles
* [x] Addic7ed

<br>

## 🔎 Search by query

###### Code:

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

###### Output:

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
    source: "opensubtitles",
    size: "",
    score: 3,
  },
];
```

<br>

## 🎞 Search by file

###### Code:

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
).on("completed", subtitles => {
  // All sources are checked.
});
```

###### Output:

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

<br>

## 📺 Download subtitle

###### Code:

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

<br>

## ⭐️ Links

###### Authors:

* [Giel Cobben](https://github.com/gielcobben)
* [Vernon de Goede](https://github.com/vernondegoede)

###### Repositories:

* [Caption](https://github.com/gielcobben/caption)
* [Caption Website](https://github.com/gielcobben/getcaption.co)

<br>

## 🔑 License

[MIT](https://github.com/gielcobben/Caption/blob/master/LICENSE) © [Giel Cobben](https://twitter.com/gielcobben) & [Vernon de Goede](https://twitter.com/vernon_dg)

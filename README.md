<h1 align="center">
  <img src="https://getcaption.co/CaptionIcon.png" width="160" alt="icon"><br>
  caption-core
  <br>
  <br>
</h1>
<br>
Download subtitles from multiple sources.

Supported sources:
- [x] opensubtitles
- [x] addic7ed

## 🔎 Search by search query

```js
const Caption = require('caption-core');

const ENGLISH = 'eng';
const LIMIT = 10;

Caption.searchByQuery('Comedians in Cars', ENGLISH, LIMIT)
    .on("fastest", subtitles => {
      // Fastest source has been checked.
    })
    .on("completed", subtitles => {
      // All sources are checked.
    });
```

Output:

```js
[
    {
        name: 'Comedians in Cars.HDTV.x264-KILLERS.srt',
        download: 'http://dl.opensubtitles.org/en/download/src-api/vrf-19c90c5e/sid-NWi9,PbRu-XVfHuV1OQ5jEwcTHd/filead/1955263769',
        extention: '',
        source: 'opensubtitles',
        size: '',
        score: 4 
    },
    {
        name: 'Comedians in Cars.eps2.0.unm4sk-pt2.tc.1080p.WEB-DL.DD5.1.H264-NTb.srt',
        download:'http://dl.opensubtitles.org/en/download/src-api/vrf-19bc0c59/sid-NWi9,PbRu-XVfHuV1OQ5jEwcTHd/filead/1955264178',
        extention: '',
        source: 'opensubtitles',
        size: '',
        score: 4
    }
]
```

## 🔑 License

[MIT](https://github.com/gielcobben/Caption/blob/master/LICENSE) © Giel Cobben

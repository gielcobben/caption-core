// @flow
const OS = require("opensubtitles-api");
const { head } = require("lodash");
const request = require("request-promise-native");
const fs = require("fs");
const iconv = require("iconv-lite");

const OpenSubtitles = new OS({
  useragent: 'caption',
  ssl:true
});

const download = (item: any, path: string): Promise<any> => {
  return new Promise(function(resolve, reject) {
    request({
      uri: item.downloadUrl,
      encoding: null,
      followRedirect: false,
    })
      .then(function(fileContentBuffer) {
        let fileContent = iconv.decode(fileContentBuffer, "utf8");

        if (~fileContent.indexOf("�")) {
          // File content seems bad encoded, try to decode again
          // ---------------------------------------------------
          fileContent = iconv.decode(fileContentBuffer, "binary");
        }

        fs.writeFile(path, fileContent, "utf8", resolve);
      })
      .catch(reject);
  });
};

const transform = (items: Array<any> = []) => {
  const results = [];

  items.map(item => {
    const result = {
      name: item.filename,
      downloadUrl: item.url,
      extention: "",
      source: "opensubtitles",
      size: "",
      score: item.score,
      download,
    };

    results.push(result);
  });

  return results;
};

const textSearch = async (query: string, language: string, limit: number) => {
  const options = {
    sublanguageid: language,
    limit: "best",
    query,
    season: 3,
  };

  // // Check if we're searching for a specific season
  // const containsSeasonSearch = query.match(/S(\d{2})/);
  // if (containsSeasonSearch) {
  //   options.season = parseInt(containsSeasonSearch[1]);
  // }

  // console.log("containsSeasonSearch", containsSeasonSearch);

  const items = await OpenSubtitles.search(options);

  if (!items instanceof Array) {
    items = [items];
  }

  if (!items) {
    console.log(`Opensubtitles: Nothing found...`);
    return [];
  }

  const firstItem = head(Object.keys(items)); // firstItem is selected language: obj[language]
  const results = items[firstItem];

  if (!results) {
    return [];
  }

  return transform(results);
};

const fileSearch = async (
  files: Array<any>,
  language: string,
  limit: number,
) => {
  const subtitleReferences = files.map(async file => {
    const info = await OpenSubtitles.identify({
      path: file.path,
      extend: true,
    });

    const options = {
      sublanguageid: language,
      limit: limit,
      hash: info.moviehash,
      filesize: info.moviebytesize,
      path: file.path,
      filename: file.filename,
      imdbid: null,
    };

    if (info && info.metadata && info.metadata.imdbid) {
      options["imdbid"] = info.metadata.imdbid;
    }

    const result = await OpenSubtitles.search(options);
    const firstItem = head(Object.keys(result));
    const subtitle = result[firstItem];

    return {
      file,
      subtitle,
    };
  });

  const downloadedReferences = await Promise.all(subtitleReferences);
  const subtitleResults = downloadedReferences.filter(
    ({ subtitle }) => subtitle !== undefined,
  );

  return subtitleResults;
};

export default {
  textSearch,
  fileSearch,
  download,
};

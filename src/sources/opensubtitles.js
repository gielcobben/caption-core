// @flow
const OS = require("opensubtitles-api");
const { head } = require("lodash");
const request = require("request");
const zlib = require("zlib");
const fs = require("fs");
const iconv = require("iconv-lite");

const OpenSubtitles = new OS({
  useragent: "caption",
  ssl: true,
});

const download = (item: any, path: string): Promise<any> => {
  return new Promise(function(resolve, reject) {
    request(
      {
        url: item.downloadUrl,
        encoding: null,
      },
      (error, response, data) => {
        if (error) throw error;
        zlib.unzip(data, (error, buffer) => {
          if (error) throw error;
          const subtitle_content = buffer.toString(item.encoding);
          fs.writeFile(path, subtitle_content, item.encoding, resolve);
        });
      },
    );
  });
};

const transform = (items: Array<any> = []) => {
  const results = [];

  items.map(item => {
    const result = {
      name: item.filename,
      downloadUrl: item.url,
      encoding: item.encoding,
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
    limit,
    query,
  };

  const items = await OpenSubtitles.search(options);

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

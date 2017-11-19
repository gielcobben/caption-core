// @flow
const OS = require("opensubtitles-api");
const { head } = require("lodash");

const OpenSubtitles = new OS("caption");

const transform = (items: Array<any> = []) => {
  const results = [];

  items.map(item => {
    const result = {
      name: item.filename,
      download: item.url,
      extention: "",
      source: "opensubtitles",
      size: "",
      score: item.score,
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
};

// @flow
const Promise = require("bluebird");
const SubDB = require("thesubdb");

import convertLanguageCode from "../utils/convertLanguageCode";

const download = async (item: {language: string, filePath: string}) =>
  await SubDB.downSub(item.language, item.filePath);

// TheSubDB does not support textSearch
const textSearch = async (query: string, language: string, limit: number) => [];

const fileSearch = async (files: Array<{path: string}>, language: string) => {
  // Caption uses iso6392B for language-codes, but thesubdb uses iso6391
  const languageCode = convertLanguageCode(language);

  // Fetch available languages for files
  const subtitleReferences = files.map(async file => ({
    languages: await SubDB.availLan(file.path),
    file
  }));

  // Only return files that are available in the given language
  return await Promise.all(subtitleReferences)
    .filter(({languages}) => languages.includes(languageCode))
    .map(result => ({language: languageCode, filePath: result.file.path}));
};

export default {
  textSearch,
  fileSearch,
  download,
};

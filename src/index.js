// @flow
import type { CaptionSource } from "./../types/index";

const Promise = require("bluebird");
const { flatMap } = require("lodash");

import addic7ed from "./sources/addic7ed";
import opensubtitles from "./sources/opensubtitles";

class CaptionCore {
  sources: Array<CaptionSource>;

  constructor() {
    this.sources = [opensubtitles, addic7ed];
  }

  searchByQuery(query: string, language: string = "eng", limit: number = 10) {
    const checkSources = this.sources.map(source => {
      return source.textSearch(query, language, limit);
    });

    return {
      on(event: void, callback: function = () => {}) {
        switch (event) {
          case "fastest":
            // Wait for first source to finish downloading, return first set of results to renderer.
            Promise.any(checkSources).then(results => {
              callback(results);
            });

            return this;

          case "completed":
          default:
            // Check whether all sources have been checked. Return to renderer and hide loading spinner.
            Promise.all(checkSources).then(results => {
              const emptyResultSet = results.filter(
                result => result.length > 0,
              );

              if (emptyResultSet.length === 0) {
                callback([]);
              }

              callback(flatMap(results));
            });

            return this;
        }
      },
    };
  }

  searchByFiles(
    files: Array<any> = [],
    language: string = "eng",
    limit: number = 10,
  ) {
    const opensubtitlesRef = opensubtitles.fileSearch(files, language, limit);

    return {
      on(event: void, callback: function = () => {}) {
        switch (event) {
          case "completed":
          default:
            // First promise which is resolved should return its results
            Promise.race([opensubtitlesRef]).then(results => callback(results));

            return this;
        }
      },
    };
  }
}

module.exports = new CaptionCore();

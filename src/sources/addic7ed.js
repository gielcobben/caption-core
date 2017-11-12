// @flow
const addic7ed = require("addic7ed-api");

import type { CaptionSource } from "./../../types/index";

export default class Addic7edSource implements CaptionSource {
  static transform(query: string, items: Array<any>) {
    const results = [];

    items.map(item => {
      const result = {
        name: `${query}.${item.distribution}.${item.team}`,
        download: item,
        extention: "",
        source: "addic7ed",
        size: "",
        score: 0,
      };

      results.push(result);
    });

    return results;
  }

  static async textSearch(query: string, language: string, limit: number) {
    const splitQuery = query.match(/s([0-9]{1,2})\s*e([0-9]{1,2})/i);

    if (!splitQuery) {
      console.log(`Addic7ed: Can't parse ${query}...`);
      return [];
    }

    const subtitles = [];
    const serie = query.replace(splitQuery[0], "");
    const season = parseInt(splitQuery[1], 10);
    const episode = parseInt(splitQuery[2], 10);
    const items = await addic7ed.search(serie, season, episode, language);

    if (!items) {
      console.log("Addic7ed: Nothing found...");
      return [];
    }

    return Addic7edSource.transform(query, items);
  }

  static async fileSearch(files: Array<any>, language: string, limit: number) {}
}

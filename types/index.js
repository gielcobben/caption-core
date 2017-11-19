// @flow
export type CaptionSource = {
  textSearch(query: string, language: string, limit: number): any,
  fileSearch(files: Array<any>, language: string, limit: number): any,
};

// @flow
export interface CaptionSource {
  static textSearch(query: string, language: string, limit: number): Array<any>;
}

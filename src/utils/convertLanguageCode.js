// @flow
const ISO6392 = require("iso-639-2");

// Caption uses iso6392B for language-codes, but some APIs use iso6391

const iso6392ToIso6391 = (iso6392:string) => {
  const conf = ISO6392.find(conf => conf.iso6392B === iso6392)
  return conf ? conf.iso6391 : null
}

export default iso6392ToIso6391

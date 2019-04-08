const sha = require("crypto-js/sha256");

export const getUniqueHash = () => { return sha(new Date().getTime().toString()).toString()};
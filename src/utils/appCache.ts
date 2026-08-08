const NodeCache = require("node-cache");

export const appCache = new NodeCache({
    stdTTL: 0,
    checkperiod: 0,
}); 
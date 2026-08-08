"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appCache = void 0;
const NodeCache = require("node-cache");
exports.appCache = new NodeCache({
    stdTTL: 0,
    checkperiod: 0,
});
//# sourceMappingURL=appCache.js.map
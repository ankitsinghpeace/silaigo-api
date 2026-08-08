"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdentityCountersSchema = void 0;
const mongoose_1 = require("mongoose");
exports.IdentityCountersSchema = new mongoose_1.Schema({
    field: { type: String, required: true },
    modelName: { type: String, required: true },
    count: {
        type: Number,
        required: true,
        default: 0,
    },
});
//# sourceMappingURL=identity.counters.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuerySchema = void 0;
const enums_1 = require("../enums");
const mongoose_1 = require("mongoose");
exports.QuerySchema = new mongoose_1.Schema({
    id: { type: Number, required: true, unique: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    message: String,
    status: {
        type: String,
        enum: Object.values(enums_1.QueryStatus),
        default: enums_1.QueryStatus.OPEN,
    },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=query.schema.js.map
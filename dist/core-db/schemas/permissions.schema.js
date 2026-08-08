"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsSchema = void 0;
const enums_1 = require("../enums");
const mongoose_1 = require("mongoose");
exports.PermissionsSchema = new mongoose_1.Schema({
    type: {
        type: String,
        required: true,
        enum: Object.values(enums_1.PermissionType),
    },
    subType: {
        type: String,
        required: true,
        enum: Object.values(enums_1.PermissionSubType),
    },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});
exports.PermissionsSchema.index({ type: 1, subType: 1 }, { unique: true });
//# sourceMappingURL=permissions.schema.js.map
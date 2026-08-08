"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolesSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.RolesSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        enum: Object.values(enums_1.RoleCode),
        required: true,
        unique: true,
    },
    permissions: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'Permission',
            required: true,
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=role.schema.js.map
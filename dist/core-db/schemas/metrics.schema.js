"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetricsSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.MetricsSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: false,
    },
    actionType: {
        type: String,
        required: true,
        enum: Object.values(enums_1.ActionType),
    },
    page: {
        type: String,
        required: true,
    },
    targetType: {
        type: String,
        enum: Object.values(enums_1.TargetType),
        required: false,
    },
    targetId: {
        type: mongoose_1.Types.ObjectId,
        required: false,
    },
    targetTitle: {
        type: String,
        required: false,
    },
    additionalData: {
        type: mongoose_1.Schema.Types.Mixed,
        required: false,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=metrics.schema.js.map
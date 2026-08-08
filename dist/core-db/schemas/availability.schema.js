"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AvailabilitySchema = void 0;
const mongoose_1 = require("mongoose");
exports.AvailabilitySchema = new mongoose_1.Schema({
    date: { type: Date, required: true, unique: true },
    type: {
        type: String,
        enum: ['HOLIDAY', 'CUSTOM'],
        required: true,
    },
    workingHours: {
        startTime: { type: String },
        endTime: { type: String },
    },
    slots: {
        type: Map,
        of: new mongoose_1.Schema({
            isBlocked: { type: Boolean, default: false },
            maxAppointments: { type: Number },
        }),
        default: {},
    },
    reason: { type: String },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=availability.schema.js.map
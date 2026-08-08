"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScheduleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ScheduleSchema = new mongoose_1.Schema({
    name: { type: String, default: 'Global Schedule' },
    workingDays: {
        type: [String],
        default: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    },
    dailyHours: {
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
    },
    slotIntervalMinutes: { type: Number, default: 60 },
    maxAppointmentsPerSlot: { type: Number, default: 2 },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=schedule.schema.js.map
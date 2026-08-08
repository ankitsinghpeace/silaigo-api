"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AppointmentSchema = new mongoose_1.Schema({
    profile: { type: mongoose_1.Types.ObjectId, ref: 'Profile', required: true },
    order: { type: mongoose_1.Types.ObjectId, ref: 'Order' },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    status: {
        type: String,
        enum: ['BOOKED', 'CANCELLED'],
        default: 'BOOKED',
    },
    notes: String,
    createdAt: { type: Date, default: Date.now },
});
exports.AppointmentSchema.index({ date: 1, time: 1 });
//# sourceMappingURL=appointment.schema.js.map
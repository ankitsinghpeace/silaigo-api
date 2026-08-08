"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneCallSchedulerSchema = void 0;
const phoneCall_scheduler_status_1 = require("../enums/phoneCall.scheduler.status");
const mongoose_1 = require("mongoose");
exports.PhoneCallSchedulerSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    category: {
        type: mongoose_1.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    appointmentDate: {
        type: Date,
        required: true
    },
    callStatus: {
        type: String,
        enum: Object.values(phoneCall_scheduler_status_1.PhoneCallStatus),
        required: true,
        default: phoneCall_scheduler_status_1.PhoneCallStatus.PENDING
    },
    orderInitiationStatus: {
        type: String,
        enum: Object.values(phoneCall_scheduler_status_1.OrderInitiationStatus),
        required: true,
        default: phoneCall_scheduler_status_1.OrderInitiationStatus.PENDING
    },
    notes: {
        type: String
    }
}, { timestamps: true });
//# sourceMappingURL=phoneCall.scheduler.schema.js.map
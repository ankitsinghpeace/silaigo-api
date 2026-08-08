"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaterialPickupSchema = void 0;
const mongoose_1 = require("mongoose");
const PickupOptionSchema = new mongoose_1.Schema({
    label: { type: String, required: true },
    type: { type: String, default: 'checkbox' },
    value: { type: Boolean, default: false },
}, { _id: false });
exports.MaterialPickupSchema = new mongoose_1.Schema({
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    pickupFor: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String },
    scheduledPickupDate: {
        type: String,
    },
    scheduledPickupTime: {
        type: String,
    },
    options: {
        type: [PickupOptionSchema],
        default: [
            { label: 'Material Picked Up from Customer' },
            { label: 'Material Delivered to Workshop' },
            { label: 'Order fulfilled' },
        ],
    },
    timeline: [
        {
            status: {
                type: String,
                required: true,
            },
            timeStamp: {
                type: Date,
                default: Date.now,
                required: true,
            },
            updatedBy: {
                type: String,
                required: true,
            },
            updatedByUserId: {
                type: mongoose_1.Types.ObjectId,
                required: true,
                ref: 'User',
            },
        },
    ],
}, { timestamps: true });
//# sourceMappingURL=pickup.schema.js.map
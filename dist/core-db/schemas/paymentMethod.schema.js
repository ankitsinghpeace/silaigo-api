"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.PaymentMethodSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    methodType: {
        type: String,
        enum: Object.values(enums_1.PaymentMethodType),
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    cardType: {
        type: String,
        required: false,
    },
    last4: {
        type: String,
        required: false,
    },
    expiryMonth: {
        type: Number,
        min: 1,
        max: 12,
        required: false,
    },
    expiryYear: {
        type: Number,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=paymentMethod.schema.js.map
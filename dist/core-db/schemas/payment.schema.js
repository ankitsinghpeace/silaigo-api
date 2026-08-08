"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.PaymentSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    order: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Order',
        required: true,
    },
    razorpayPaymentId: { type: String },
    paymentMethod: {
        type: mongoose_1.Types.ObjectId,
        ref: 'PaymentMethod',
    },
    method: {
        type: String,
        enum: Object.values(enums_1.PaymentMethodType),
    },
    amount: { type: Number, required: true },
    discountedAmount: { type: Number },
    coupon: { type: String },
    priceBreakup: [
        {
            subCategory: {
                type: mongoose_1.Types.ObjectId,
                ref: 'SubCategory',
                required: true,
            },
            subCategoryStyleId: {
                type: mongoose_1.Types.ObjectId,
            },
            orderId: {
                type: String,
            },
            customizations: [
                {
                    optionId: {
                        type: mongoose_1.Types.ObjectId,
                        ref: 'Customization',
                    },
                    type: {
                        type: String,
                    },
                },
            ],
            options: [
                {
                    categoryId: {
                        type: mongoose_1.Types.ObjectId,
                        ref: 'Category',
                    },
                    optionId: {
                        type: mongoose_1.Types.ObjectId,
                    },
                },
            ],
            notes: { type: String },
        },
    ],
    status: {
        type: String,
        enum: Object.values(enums_1.PaymentStatus),
        default: enums_1.PaymentStatus.SUCCESS,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
//# sourceMappingURL=payment.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const enums_1 = require("../enums");
const mongoose_1 = require("mongoose");
exports.OrderSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    items: [
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
        default: enums_1.OrderStatus.PLACED,
    },
    orderProcessingState: {
        type: String,
        enum: Object.values(enums_1.OrderProcessingState),
        default: enums_1.OrderProcessingState.ORDER_FULFILLED,
    },
    payment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Payment',
    },
    appointment: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Appointment',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    imageUrls: {
        type: [String],
    },
    customPrice: {
        type: Number,
    },
    addressId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Address',
    },
    timeLine: [
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
    measurements: {
        type: mongoose_1.default.Schema.Types.Mixed,
    },
    notes: {
        type: String,
    },
    pinPosition: {
        type: Number,
    },
    assignedToStitchingAgentId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    isPinned: {
        type: Boolean,
    },
    paymentStatus: {
        type: String,
        enum: ['PAID', 'UNPAID', 'PARTIALLY_PAID'],
    },
});
//# sourceMappingURL=order.schema.js.map
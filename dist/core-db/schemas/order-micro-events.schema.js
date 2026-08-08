"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderMicroEventsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrderMicroEventsSchema = new mongoose_1.Schema({
    orderId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Order', required: true },
    roleId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Role', required: true },
    events: [
        {
            status: { type: String, required: true },
            key: { type: String, required: true },
            value: { type: mongoose_1.Schema.Types.Mixed },
            timeStamp: { type: Date, default: Date.now },
            updatedBy: { type: String, required: true },
            updatedByUserId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'User',
                required: true,
            },
        },
    ],
});
//# sourceMappingURL=order-micro-events.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersEventsOptionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.OrdersEventsOptionsSchema = new mongoose_1.Schema({
    roleId: { type: mongoose_1.Types.ObjectId, ref: 'Role', required: true },
    options: [
        {
            label: { type: String, required: true },
            type: { type: String, enum: ['checkbox', 'action', 'input', 'dropdown'] },
            inputRequired: { type: Boolean, default: false },
            inputType: {
                type: String,
                enum: ['text', 'textarea', 'select', null],
                default: null,
            },
            dataSource: { type: String, default: null },
            repeatable: { type: Boolean, default: false },
        },
    ],
});
//# sourceMappingURL=order-events-options.schema.js.map
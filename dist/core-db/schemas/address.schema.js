"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AddressSchema = new mongoose_1.Schema({
    profile: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Profile',
        required: true,
    },
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    isDefault: { type: Boolean, default: false },
});
//# sourceMappingURL=address.schema.js.map
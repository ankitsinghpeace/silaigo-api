"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizationSchema = exports.CustomizationOptionSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.CustomizationOptionSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Types.ObjectId, auto: true },
    title: { type: String, required: true },
    imageUrl: { type: String },
    complexity: {
        type: String,
        enum: Object.values(enums_1.CustomizationComplexity),
        required: true,
    },
    price: { type: Number, default: 0 },
    discountedPrice: { type: Number, default: 0 },
});
exports.CustomizationSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    options: { type: [exports.CustomizationOptionSchema], required: true },
    rank: { type: Number }
});
//# sourceMappingURL=customizations.schema.js.map
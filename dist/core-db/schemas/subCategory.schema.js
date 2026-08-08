"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubCategorySchema = exports.SubCategoryItemSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SubCategoryItemSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String },
    keyAttributes: [{ type: String }],
    price: { type: Number },
    discountedPrice: { type: Number },
    label: { type: mongoose_1.Schema.Types.Mixed },
    rank: { type: Number },
}, {
    minimize: true,
});
exports.SubCategorySchema = new mongoose_1.Schema({
    categoryId: { type: Number, required: true, unique: true },
    SubCategories: {
        type: [exports.SubCategoryItemSchema],
        required: true,
        default: [],
    },
});
exports.SubCategorySchema.index({
    categoryId: 1,
    'SubCategories.name': 1,
}, {
    unique: true,
    partialFilterExpression: { 'SubCategories.name': { $exists: true } },
});
//# sourceMappingURL=subCategory.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = exports.CategorySchema = exports.OptionsSchema = exports.labelSchema = void 0;
const mongoose_1 = require("mongoose");
exports.labelSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    name: { type: String, required: true },
    color: { type: String },
}, { _id: false });
exports.OptionsSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    discountedPrice: { type: String, required: true },
    price: { type: String, required: true },
}, { _id: true });
exports.CategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    isVisibleOnHomePage: { type: Boolean, default: false },
    imageUrl: { type: String, required: true },
    description: { type: String },
    id: { type: Number, unique: true },
    label: exports.labelSchema,
    rank: { type: Number },
    options: [exports.OptionsSchema]
});
exports.CategoryModel = (0, mongoose_1.model)('Category', exports.CategorySchema);
//# sourceMappingURL=category.schema.js.map
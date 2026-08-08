"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryLandingConfigModel = exports.CategoryLandingConfigSchema = exports.CustomizationOptionsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CustomizationOptionsSchema = new mongoose_1.Schema({
    neck: {
        enabled: Boolean,
        optionIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Option' }],
    },
    sleeve: {
        enabled: Boolean,
        optionIds: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Option' }],
    },
    backNeck: {
        enabled: Boolean,
    },
    addOns: {
        enabled: Boolean,
    },
    accessories: {
        enabled: Boolean,
    },
    options: {
        enabled: Boolean,
    },
}, { _id: false });
exports.CategoryLandingConfigSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    categoryName: { type: String, required: true },
    pricingCardSubCategoryIds: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'SubCategory' },
    ],
    mainCardSubCategoryIds: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: 'SubCategory' },
    ],
    customizationOptions: exports.CustomizationOptionsSchema,
    longDescription: String,
}, { timestamps: true });
exports.CategoryLandingConfigModel = (0, mongoose_1.model)('CategoryLandingConfig', exports.CategoryLandingConfigSchema);
//# sourceMappingURL=category.landing.config.schema.js.map
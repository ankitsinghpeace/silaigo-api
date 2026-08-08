"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomizationOptionMappingSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CustomizationOptionMappingSchema = new mongoose_1.Schema({
    customizationType: { type: String, required: true },
    optionIds: [{ type: String, required: true }],
    subCategoryIds: [
        {
            type: mongoose_1.Types.ObjectId,
            ref: 'SubCategory',
            required: true,
        },
    ],
    categoryId: {
        type: mongoose_1.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});
exports.CustomizationOptionMappingSchema.index({ customizationType: 1, categoryId: 1 }, { unique: true });
//# sourceMappingURL=customization.options.mapping.schema.js.map
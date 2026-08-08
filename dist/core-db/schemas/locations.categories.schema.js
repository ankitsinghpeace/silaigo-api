"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationCategoryModel = exports.LocationCategorySchema = void 0;
const mongoose_1 = require("mongoose");
exports.LocationCategorySchema = new mongoose_1.Schema({
    locationId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Location',
        required: true,
    },
    locationName: {
        type: String,
        required: true,
    },
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    categoryName: {
        type: String,
        required: true,
    },
    longDescription: String,
}, { timestamps: true });
exports.LocationCategorySchema.index({ locationId: 1, categoryId: 1 }, { unique: true });
exports.LocationCategoryModel = (0, mongoose_1.model)('LocationCategory', exports.LocationCategorySchema);
//# sourceMappingURL=locations.categories.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationModel = exports.LocationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.LocationSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    sublocations: {
        type: [String],
        default: [],
    },
    pricingCardSubCategoryIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
    ],
    mainCardSubCategoryIds: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'SubCategory',
        },
    ],
    longDescription: String,
}, { timestamps: true });
exports.LocationModel = (0, mongoose_1.model)('Location', exports.LocationSchema);
//# sourceMappingURL=locations.schema.js.map
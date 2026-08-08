"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeasurementCategorySchema = exports.FieldSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FieldSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    id: { type: String, required: true, unique: true },
});
exports.MeasurementCategorySchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    label: { type: String, required: true },
    fields: [exports.FieldSchema],
});
//# sourceMappingURL=measurements-fields.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSectionSchema = void 0;
const mongoose_1 = require("mongoose");
const enums_1 = require("../enums");
exports.PageSectionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(enums_1.PageSectionType),
        required: true,
    },
    data: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
    },
});
//# sourceMappingURL=page.section.schema.js.map
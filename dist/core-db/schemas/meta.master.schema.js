"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetaMasterSchema = void 0;
const mongoose_1 = require("mongoose");
exports.MetaMasterSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    subType: { type: String, required: true },
    label: { type: String, required: true },
    value: { type: mongoose_1.Schema.Types.Mixed },
    isActive: { type: Boolean, default: true },
});
//# sourceMappingURL=meta.master.schema.js.map
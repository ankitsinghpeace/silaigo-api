"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const enums_1 = require("../enums");
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    empId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: {
        type: String,
        enum: Object.values(enums_1.Gender),
        default: enums_1.Gender.NOT_SPECIFIED,
    },
    joiningDate: { type: Date, required: true },
    designation: { type: String, required: true },
    role: { type: mongoose_1.Types.ObjectId, ref: 'Role', required: true },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=user.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = exports.ProfileSchema = void 0;
const mongoose_1 = require("mongoose");
const profile_enums_1 = require("../enums/profile.enums");
Object.defineProperty(exports, "Gender", { enumerable: true, get: function () { return profile_enums_1.Gender; } });
exports.ProfileSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    gender: {
        type: String,
        enum: Object.values(profile_enums_1.Gender),
        default: profile_enums_1.Gender.NOT_SPECIFIED,
    },
    birthDate: { type: Date, default: null },
    phone: { type: String },
    email: { type: String },
    referralCode: { type: String },
    referredBy: { type: String },
    notes: { type: String },
    colorCode: { type: String },
    createdAt: { type: Date, default: Date.now },
});
//# sourceMappingURL=profile.schema.js.map
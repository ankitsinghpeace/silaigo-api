"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const enums_1 = require("../../enums");
const mongoose_1 = require("mongoose");
exports.users = [
    {
        email: 'admin@silai-go.com',
        passwordHash: '<REPLACE_WITH_HASH>',
        empId: 'EMP-ADMIN-001',
        firstName: 'Super',
        lastName: 'Admin',
        gender: enums_1.Gender.NOT_SPECIFIED,
        joiningDate: new Date('2024-01-01'),
        designation: 'Administrator',
        role: new mongoose_1.Types.ObjectId('64b8c0dfe8e4e24f8a0d4a21'),
        createdAt: new Date(),
    },
];
//# sourceMappingURL=user.data.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.permissions = void 0;
const enums_1 = require("../../enums");
const permissionTypes = Object.values(enums_1.PermissionType);
const permissionSubTypes = Object.values(enums_1.PermissionSubType);
exports.permissions = permissionTypes.flatMap((type) => permissionSubTypes.map((subType) => ({
    type,
    subType,
    description: `${type.charAt(0).toUpperCase() + type.slice(1)} - ${subType.charAt(0).toUpperCase() + subType.slice(1)}`,
    createdAt: new Date(),
})));
//# sourceMappingURL=permissions.data.js.map
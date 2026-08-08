"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionSubType = exports.PermissionType = void 0;
var PermissionType;
(function (PermissionType) {
    PermissionType["DASHBOARD"] = "dashboard";
    PermissionType["PROFILE"] = "profile";
    PermissionType["ORDER"] = "order";
    PermissionType["PAYMENT"] = "payment";
    PermissionType["USER"] = "user";
    PermissionType["CONTENT"] = "content";
    PermissionType["ANALYTICS"] = "analytics";
    PermissionType["CUSTOMERS"] = "customers";
    PermissionType["APPOINTMENTS"] = "appointments";
    PermissionType["INVENTORY"] = "inventory";
    PermissionType["ROLES"] = "roles";
})(PermissionType || (exports.PermissionType = PermissionType = {}));
var PermissionSubType;
(function (PermissionSubType) {
    PermissionSubType["ALL"] = "all";
    PermissionSubType["CREATE"] = "create";
    PermissionSubType["EDIT"] = "edit";
    PermissionSubType["DELETE"] = "delete";
    PermissionSubType["VIEW"] = "view";
})(PermissionSubType || (exports.PermissionSubType = PermissionSubType = {}));
//# sourceMappingURL=permissions.enums.js.map
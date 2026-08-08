"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionsGuard = void 0;
const common_1 = require("@nestjs/common");
const PermissionsGuard = (permission) => {
    class PermissionGuardMixin {
        canActivate(context) {
            const request = context.switchToHttp().getRequest();
            const user = request.user;
            return user && permission.some((perm) => user.permissions.includes(perm));
        }
    }
    const guard = (0, common_1.mixin)(PermissionGuardMixin);
    return guard;
};
exports.PermissionsGuard = PermissionsGuard;
//# sourceMappingURL=permissions.guard.js.map
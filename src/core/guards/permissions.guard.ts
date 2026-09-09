import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { RoleCode } from 'core-db/enums/roles.enums';

export const PermissionsGuard = (permission: string[]) => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) return false;

      // Allow ADMIN, SUPPORT, or PICKUP_COORDINATOR or users with permission string matching
      if (
        user.role === RoleCode.ADMIN ||
        user.role === RoleCode.SUPPORT ||
        user.role === RoleCode.PICKUP_COORDINATOR
      ) {
        return true;
      }

      return permission.some((perm) => user.permissions?.includes(perm));
    }
  }

  const guard = mixin(PermissionGuardMixin);
  return guard;
};

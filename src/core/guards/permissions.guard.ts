import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';

export const PermissionsGuard = (permission: string[]) => {
  class PermissionGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user) return false;

      // Allow ADMIN or SUPPORT or users with permission string matching
      if (user.role === 'ADMIN' || user.role === 'SUPPORT') {
        return true;
      }

      return permission.some((perm) => user.permissions?.includes(perm));
    }
  }

  const guard = mixin(PermissionGuardMixin);
  return guard;
};

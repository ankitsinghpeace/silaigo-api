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


      return user && permission.some((perm) => user.permissions.includes(perm));
    }
  }

  const guard = mixin(PermissionGuardMixin);
  return guard;
};

import { ExecutionContext } from '@nestjs/common';
export declare const PermissionsGuard: (permission: string[]) => import("@nestjs/common").Type<{
    canActivate(context: ExecutionContext): boolean;
}>;

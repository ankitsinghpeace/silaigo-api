// src/middleware/request-context.middleware.ts
import {
  Inject,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from 'src/utils/jwtService';
import { IUser } from 'core-db/interface';
import { Model } from 'mongoose';
import { ModelMetadata } from 'core-db/model.metadata';
import { IProfile } from 'core-db/interface';
import { IRole } from 'core-db/interface';
import { IPermission } from 'core-db/interface';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    @Inject(ModelMetadata.Profile.token)
    private readonly profileModel: Model<IProfile>,
    @Inject(ModelMetadata.Role.token)
    private readonly roleModel: Model<IRole>,
    @Inject(ModelMetadata.Permission.token)
    private readonly permissionModel: Model<IPermission>,
    @Inject(ModelMetadata.User.token)
    private readonly userModel: Model<IUser>,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      // const accessToken = req.headers['authorization'] as string;
      const accessToken = req.cookies['accessToken'];

      if (!accessToken) {
        throw new UnauthorizedException('Unauthorized user');
      }

      const decoded = verifyJwt(accessToken, process.env.ACCESS_TOKEN_SECRET);

      if (!decoded) {
        throw new UnauthorizedException('Unauthorized user');
      }

      const userId = decoded.userId;
      const userRole = decoded?.role;

      if (userId && userRole) {
        const user = await this.userModel
          .findOne({ _id: userId })
          .populate({
            path: 'role',
            populate: {
              path: 'permissions',
              model: 'Permission',
            },
          })
          .lean();

        if (!user || !user.role)
          throw new UnauthorizedException('Unauthorized user');

        const transformedPermissions = (user.role.permissions || [])
          .filter(
            (perm: any) =>
              typeof perm === 'object' && perm?.type && perm?.subType,
          )
          .map((perm: any) => `${perm.type}.${perm.subType}`);

        (req as any).user = {
          ...user,
          permissions: transformedPermissions,
          role: user.role.code,
          roleId: user.role._id,
        };
        next();
      } else {
        const user = await this.profileModel
          .findOne({ _id: userId })
          .select({
            passwordHash: 0,
            addresses: 0,
            savedPaymentMethods: 0,
          })
          .lean();

        if (!user) {
          throw new UnauthorizedException('Unauthorized user');
        }

        // Attach user to request object
        (req as any).user = { ...user, role: 'customer' };

        next();
      }
    } catch (error) {
      throw new UnauthorizedException('Unauthorized user');
    }
  }
}

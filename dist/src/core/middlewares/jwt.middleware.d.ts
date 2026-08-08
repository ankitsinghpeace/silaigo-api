import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { IUser } from 'core-db/interface';
import { Model } from 'mongoose';
import { IProfile } from 'core-db/interface';
import { IRole } from 'core-db/interface';
import { IPermission } from 'core-db/interface';
export declare class JwtMiddleware implements NestMiddleware {
    private readonly profileModel;
    private readonly roleModel;
    private readonly permissionModel;
    private readonly userModel;
    constructor(profileModel: Model<IProfile>, roleModel: Model<IRole>, permissionModel: Model<IPermission>, userModel: Model<IUser>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class RequestContextMiddleware implements NestMiddleware {
    private readonly RequestContext;
    use(req: Request, res: Response, next: NextFunction): void;
}

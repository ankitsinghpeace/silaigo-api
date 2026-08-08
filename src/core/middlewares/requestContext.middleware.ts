// src/middleware/request-context.middleware.ts
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as cls from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  private readonly RequestContext = cls.createNamespace('request');

  use(req: Request, res: Response, next: NextFunction) {
    const requestId = req.headers['x-request-id'] || uuidv4();  
    const userId = req.body.user?.id || 'unknown-user'; 
    const leadId = req.body.user?.leadId || 'unknown-lead'; 
    const sub = req.body.user?.sub || 'unknown-sub';  
    const type = req.body.user?.type || 'unknown-type'; 
    const email = req.body.user?.email || 'unknown-email'; 
    
    this.RequestContext.run(() => {
      this.RequestContext.set('requestId', requestId);
      this.RequestContext.set('userId', userId);
      this.RequestContext.set('sub', sub);
      this.RequestContext.set('type', type);
      this.RequestContext.set('email', email);

      console.log(`RequestContextMiddleware: Request ID: ${requestId}, User ID: ${userId}, Sub: ${sub}`);
      next();
    });
  }
}
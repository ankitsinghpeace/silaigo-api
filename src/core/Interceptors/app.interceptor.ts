import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { interceptMessages } from '../config/constants/messages';

export interface Response<T> {
  statusCode: number;
  data: T;
  message: string;
}

@Injectable()
export class AppInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const method = context.switchToHttp().getRequest().method;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: interceptMessages[method],
          data,
        };
      })
    );
  }
}

// import {
//   CallHandler,
//   ExecutionContext,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { Observable } from 'rxjs';
// import { tap, catchError } from 'rxjs/operators';
// // import * as opentracing from 'opentracing';
// import tracer from 'src/tracer';

// @Injectable()
// export class HttpTracingInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const httpContext = context.switchToHttp();
//     const request = httpContext.getRequest();
//     const { params } = request;
//     const { emailAddress } = params ?? {};
//     const span = tracer.startSpan('express.request', {
//       childOf: tracer.scope().active(),
//       tags: {
//         'http.method': request.method,
//         'http.url': request.url,
//         'span.kind': 'server',
//         'span.user_email': emailAddress || 'email does not exits',
//       },
//     });

//     return next.handle().pipe(
//       tap(() => {
//         span.finish();
//       }),
//       catchError((error) => {
//         // span.setTag(opentracing.Tags.ERROR, true);
//         span.log({
//           'error.object': error,
//           event: 'error',
//           message: error.message,
//           stack: error.stack || 'no error stack',
//         });
//         span.finish();
//         throw error;
//       })
//     );
//   }
// }

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const { method, originalUrl, body, params, requestId } = request;
    const logMessage = `${method} ${originalUrl} params:${JSON.stringify(
      params,
    )} request-body:${JSON.stringify(body)}
    error-stack:${exception?.stack}`;
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      message = 'Internal Server Error',
      error = exception;

    statusCode =
      exception?.response?.statusCode ||
      exception?.status ||
      HttpStatus.INTERNAL_SERVER_ERROR;
    message =
      exception?.response?.message ||
      exception?.message ||
      'Internal Server Error';
    error = exception?.response?.error || exception?.response?.message;

    response.status(statusCode).json({
      statusCode: statusCode,
      message: message,
      error: error,
      data: {},
    });
  }
}

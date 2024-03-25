import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    console.log('exception: ', exception.message);
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;
    const validationErrors =
      exception.getResponse &&
      (exception.getResponse() as { message: string[] });
    console.log('validationErrors?.message: ', validationErrors?.message);
    const message =
      (Array.isArray(validationErrors?.message)
        ? validationErrors?.message[0]
        : validationErrors?.message) || exception.message;
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: message || 'Internal server error',
    });
  }
}

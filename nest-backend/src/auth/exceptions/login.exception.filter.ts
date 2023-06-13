import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.message;
    const path = request.url;

    if (path === '/login' && status === 401 && message === 'Unauthorized') {
      return response.status(status).json({
        message: 'Campos inválidos',
      });
    }

    if (path === '/login' && status === 500) {
      return response.status(status).json({
        message: 'Erro ao tentar encontrar o usuário no servidor',
      });
    }

    return response.status(status).json({
      message: message,
    });
  }
}

import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class LoginExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    console.warn(exception);

    if (status === 401 && message === 'Unauthorized') {
      return response.status(400).json({
        message: 'Campos inválidos',
      });
    }

    if (status === 500) {
      return response.status(status).json({
        message: 'Erro ao tentar encontrar o usuário no servidor',
      });
    }

    return response.status(status).json({
      message: message,
    });
  }
}

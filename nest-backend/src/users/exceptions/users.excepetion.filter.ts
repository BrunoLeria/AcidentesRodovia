import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class UsersExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    console.warn(exception);

    if (status === 400) {
      return response.status(status).json({
        message: 'Campos inválidos',
      });
    }

    if (status === 422) {
      return response.status(status).json({
        message: 'Email já utilizado',
      });
    }

    if (status === 401) {
      return response.status(status).json({
        message: 'Essas credenciais não correspondem aos nossos registros',
      });
    }
    return response.status(status).json({
      message: message,
    });
  }
}

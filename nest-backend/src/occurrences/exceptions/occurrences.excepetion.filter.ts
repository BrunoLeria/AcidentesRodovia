import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class OccurrencesExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const message = exception.message;

    if (status === 400) {
      return response.status(status).json({
        message: 'Campos inválidos',
      });
    }

    if (status === 401) {
      return response.status(status).json({
        message: 'Essas credenciais não correspondem aos nossos registros',
      });
    }

    if (status === 404) {
      return response.status(400).json({
        message: 'Campos inválidos',
      });
    }

    return response.status(status).json({
      message: message,
    });
  }
}

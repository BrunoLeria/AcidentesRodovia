import {
  Controller,
  HttpCode,
  Post,
  UseGuards,
  UseFilters,
  Res,
  Body,
} from '@nestjs/common';
import { CurrentUser } from './current-user.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Response } from 'express';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { LoginExceptionFilter } from './exceptions/login.exception.filter';
import JwtAuthGuard from './guards/jwt-auth.guard';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @UseFilters(LoginExceptionFilter)
  @Post('login')
  async login(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const token = await this.authService.login(user);
    response.send({
      token: token,
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logout(
    @Res({ passthrough: true }) response: Response,
    @Body('id') id: number,
  ) {
    return await this.authService.logout(response, id);
  }
}

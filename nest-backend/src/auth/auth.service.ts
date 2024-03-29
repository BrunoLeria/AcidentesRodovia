import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from '../users/schemas/user.schema';
import { TokenPayload } from './interfaces/tokenPayload.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user: User): Promise<string> {
    const tokenPayload: TokenPayload = {
      userId: `${user.id}`,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return this.jwtService.sign(tokenPayload);
  }
  async logout(response: Response, id: number) {
    if (!id || id < 1) {
      throw new BadRequestException('Informe um ID válido');
    }
    try {
      response.cookie('Authentication', '', {
        httpOnly: true,
      });

      return { message: 'Logout realizado com sucesso' };
    } catch (error) {
      throw new InternalServerErrorException(
        '	Erro ao tentar encontrar o usuário no servidor',
      );
    }
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.getAllUserInfo({ email: email });
      await this.validatePassword(password, user.password);
      return user;
    } catch (error) {
      throw new UnauthorizedException(
        'Essas credenciais não correspondem aos nossos registros.',
      );
    }
  }

  async validatePassword(password: string, hashedPassword: string) {
    const passwordIsValid = await bcrypt.compare(password, hashedPassword);
    if (!passwordIsValid) {
      throw new UnauthorizedException(
        'Essas credenciais não correspondem aos nossos registros.',
      );
    }
  }
}

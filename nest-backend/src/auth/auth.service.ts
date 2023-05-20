import { Injectable, UnauthorizedException } from '@nestjs/common';
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
      userId: user.userId,
    };

    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    return this.jwtService.sign(tokenPayload);
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
    });
  }

  async validateUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({ email: email });
      await this.validatePassword(password, user.password);
      return user;
    } catch (error) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async validatePassword(password: string, hashedPassword: string) {
    const passwordIsValid = await bcrypt.compare(password, hashedPassword);
    if (!passwordIsValid) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }
}
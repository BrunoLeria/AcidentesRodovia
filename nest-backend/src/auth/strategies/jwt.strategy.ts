import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const [type, token] = request.headers.authorization?.split(' ') ?? [];
          return type === 'Bearer' ? token : undefined;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload, id: string) {
    try {
      if (userId !== id)
        throw new UnauthorizedException(
          'You are not authorized to perform this action.',
        );
      return await this.usersService.getUser({ userId: userId });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

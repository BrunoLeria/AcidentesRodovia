import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { Request } from 'express';
import { OccurrencesService } from '../../occurrences/occurrences.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly occurrencesService: OccurrencesService,
  ) {
    super({
      passReqToCallback: true,
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const [type, token] = request.headers.authorization?.split(' ') ?? [];
          return type === 'Bearer' ? token : undefined;
        },
      ]),
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(request: Request, { userId }: TokenPayload) {
    try {
      const isOccurrence = request.originalUrl.includes('/occurrences');
      const isLogout = request.originalUrl.includes('/logout');
      const isOwner = request?.params?.id === userId;

      if (!isOccurrence && !isOwner && !isLogout) {
        throw new UnauthorizedException();
      }

      if (isOccurrence) {
        const body = request.body;
        if (body && body.user_id !== parseInt(userId)) {
          throw new UnauthorizedException();
        }
      }

      return await this.usersService.getUser({ id: parseInt(userId) });
    } catch (err) {
      throw new UnauthorizedException();
    }
  }
}

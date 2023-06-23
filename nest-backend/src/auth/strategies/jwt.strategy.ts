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
        console.warn('Usuário logado não é o dono do perfil a ser alterado');
        throw new UnauthorizedException(
          'Essas credenciais não correspondem aos nossos registros',
        );
      }

      if (isOccurrence) {
        const body = request.body;
        if (body && body.user_id && body.user_id !== parseInt(userId)) {
          if (typeof body.user_id === 'string') {
            console.warn('Usuário informado não é um número');
            throw new UnauthorizedException('Dados inválidos');
          }
          console.warn('A ocorrência não pertence ao usuário informado');
          throw new UnauthorizedException(
            'Essas credenciais não correspondem aos nossos registros',
          );
        }
        if (
          (request.method === 'PUT' || request.method === 'DELETE') &&
          !(await this.occurrencesService.checkOccurrenceOwner(
            request?.params?.id,
            userId,
          ))
        ) {
          {
            console.warn(
              'Usuário não é dono da ocorrência para realizar a ação',
            );
            throw new UnauthorizedException(
              'Essas credenciais não correspondem aos nossos registros',
            );
          }
        }
      }

      return await this.usersService.getUser({ id: parseInt(userId) });
    } catch (err) {
      console.warn(err);
      throw new UnauthorizedException(
        'Essas credenciais não correspondem aos nossos registros',
      );
    }
  }
}

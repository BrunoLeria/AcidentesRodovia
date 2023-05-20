import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { OccurrencesModule } from './occurrences/occurrences.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        MONGODB_DB: Joi.string().required(),
        PORT: Joi.number().required(),
        JWT_EXPIRATION: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    OccurrencesModule,
  ],
})
export class AppModule {}

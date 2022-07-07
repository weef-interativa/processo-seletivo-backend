import * as Joi from 'joi'
import { Module } from '@nestjs/common';
import { EventsModule } from './modules/events/events.module';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './configs/database.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
          POSTGRES_HOST: Joi.string().required(),
          POSTGRES_PORT: Joi.number().required(),
          POSTGRES_USER: Joi.string().required(),
          POSTGRES_PASSWORD: Joi.string().required(),
          POSTGRES_DB: Joi.string().required(),
          PORT: Joi.number(),
          JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
          JWT_ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
      }),
  }),
  EventsModule,
  DatabaseModule,
  AuthenticationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

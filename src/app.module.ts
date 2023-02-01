import { EventAddress } from './events/entities/event_address.entity';
import { User } from './users/entities/user.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { EventsModule } from './events/events.module';
import { Event } from './events/entities/event.entity';
import { EventImage } from './events/entities/event_image.entity';
import * as dotenv from 'dotenv';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
dotenv.config();

const DB_TEST = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: ':memory:',
  synchronize: true,
  entities: [User, Event, EventImage, EventAddress],
});

const DB_ORIGINAL = TypeOrmModule.forRoot({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  synchronize: true,
  entities: [User, Event, EventImage, EventAddress],
});

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    process.env.NODE_ENV === 'test' ? DB_TEST : DB_ORIGINAL,
    UserModule,
    AuthModule,
    EventsModule,
  ],
  controllers: [],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

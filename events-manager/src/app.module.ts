import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';
import { AuthModule } from './auth/auth.module';
import { ImagesModule } from './images/images.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, EventsModule, AuthModule, ImagesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { UsersModule } from './users/users.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UsersModule, EventsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

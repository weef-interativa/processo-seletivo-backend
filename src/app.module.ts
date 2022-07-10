import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [EventModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

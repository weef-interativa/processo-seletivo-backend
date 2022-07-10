import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.provider';
import { EventModule } from './event/event.module';
import { EventService } from './event/event.service';

@Module({
  imports: [EventModule],
  controllers: [],
  providers: [DatabaseModule],
})
export class AppModule {}

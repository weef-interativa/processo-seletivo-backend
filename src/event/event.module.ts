import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { eventProviders } from './event.provider';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  providers: [...eventProviders, EventService],
})
export class EventModule {}

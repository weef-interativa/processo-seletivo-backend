import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import EventImage from './entities/event-image.entity';
import Event from './entities/event.entity';
import { EventsController } from './event.controller';
import { EventsService } from './event.service';
import { IsEventOwner } from './guards/is-event-owner.guard';

@Module({
  imports: [TypeOrmModule.forFeature([Event, EventImage])],
  controllers: [EventsController],
  providers: [EventsService, IsEventOwner],
  exports: [],
})
export class EventModule {}

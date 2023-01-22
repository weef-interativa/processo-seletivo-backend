import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Event } from './entities/event.entity';
import { EventAddress } from './entities/event_address.entity';
import { EventImage } from './entities/event_image.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { EventCloudinaryService } from './services/events-cloudinary-upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, EventImage, EventAddress])],
  controllers: [EventsController],
  providers: [EventsService, EventCloudinaryService],
  exports: [EventsService],
})
export class EventsModule {}

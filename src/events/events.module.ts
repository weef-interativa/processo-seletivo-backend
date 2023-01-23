import { EventsAddressService } from './services/events-address.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './../users/entities/user.entity';
import { Event } from './entities/event.entity';
import { EventAddress } from './entities/event_address.entity';
import { EventImage } from './entities/event_image.entity';
import { EventsController } from './events.controller';
import { EventCloudinaryService } from './services/events-cloudinary-upload.service';
import { EventsImageService } from './services/events-images.service';
import { EventsService } from './services/events.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Event, EventImage, EventAddress])],
  controllers: [EventsController],
  providers: [
    EventsService,
    EventCloudinaryService,
    EventsImageService,
    EventsAddressService,
  ],
  exports: [EventsService],
})
export class EventsModule {}

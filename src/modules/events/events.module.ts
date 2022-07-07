import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import EventImages from '../event-images/entities/event-images.entity';
import EventImagesController from '../event-images/event-images.controller';
import { EventImagesService } from '../event-images/event-images.service';
import User from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import Events from './entities/events.entity';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';

@Module({
  imports: [TypeOrmModule.forFeature([Events, EventImages, User])],
  controllers: [EventsController, EventImagesController],
  providers: [EventsService, UsersService, EventImagesService]
})
export class EventsModule {}

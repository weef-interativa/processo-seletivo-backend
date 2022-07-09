import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Image } from './entities/image.entity';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';

@Module({
	imports: [TypeOrmModule.forFeature([Event, Image])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}

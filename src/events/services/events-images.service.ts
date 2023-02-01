import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventImage } from '../entities/event_image.entity';

@Injectable()
export class EventsImageService {
  constructor(
    @InjectRepository(EventImage)
    private readonly eventImageRepository: Repository<EventImage>,
  ) {}

  async updateEventImage(
    createEventImagesDto: Partial<EventImage>[],
    deleteEventImagesId: number[] | undefined,
    eventId: number,
  ) {
    if (createEventImagesDto.length > 0) {
      await this.eventImageRepository.save(createEventImagesDto);
    }
    if (deleteEventImagesId.length > 0) {
      await this.eventImageRepository.delete(deleteEventImagesId);
    }

    const eventFound = await this.eventImageRepository.find({
      where: {
        eventId,
      },
    });

    return eventFound;
  }

  async create(createEventImagesDto: Partial<EventImage>[], eventId: number) {
    if (createEventImagesDto.length > 0) {
      await this.eventImageRepository.save(createEventImagesDto);
    }

    const eventFound = await this.eventImageRepository.find({
      where: {
        eventId,
      },
    });

    return eventFound;
  }
}

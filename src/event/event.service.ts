import { Injectable, Inject } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateEventDTO } from './DTOs/create-event.dto';
import { UpdateEventDTO } from './DTOs/update-event.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  constructor(
    @Inject('EVENT_REPOSITORY')
    private eventRepository: Repository<Event>,
  ) {}

  async create(createEvent: CreateEventDTO): Promise<Event> {
    return this.eventRepository.save(createEvent);
  }

  async findByID(id: string): Promise<Event[]> {
    return this.eventRepository.find({
      where: {
        id: id,
      },
    });
  }

  async destroy(id: string): Promise<DeleteResult> {
    return this.eventRepository.delete(id);
  }

  async update(id: string, updateEvent: UpdateEventDTO): Promise<UpdateResult> {
    return this.eventRepository.update(id, updateEvent);
  }
}

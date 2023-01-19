import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateEventDTO from './dto/create-event.dto';
import UpdateEventDTO from './dto/update-event.dto';
import EventImage from './entities/event-image.entity';
import Event from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,

    @InjectRepository(EventImage)
    private eventImageRepository: Repository<EventImage>,
  ) {}

  async findAll() {
    return await this.eventRepository.find();
  }

  async findOne(id: string) {
    return await this.eventRepository.findOneOrFail({ where: { id } });
  }

  async create(userId: string, data: CreateEventDTO) {
    return await this.eventRepository.save({
      responsible: { id: userId },
      ...data,
    });
  }

  async update(id: string, data: UpdateEventDTO) {
    return await this.eventRepository.save({
      id,
      ...data,
    });
  }

  async delete(id: string) {
    const result = await this.eventRepository.delete({ id });
    return !!result.affected;
  }
}

import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(private database: DatabaseService) {}

  create(createEventDto: CreateEventDto) {
    return 'This action adds a new event';
  }

  findAll() {
    return this.database.event.findMany();
  }

  findOne(id: number) {
    const event = this.database.event.findUnique({ where: { id } });
    if (event === undefined) {
      throw new ForbiddenException('event not exists');
    }

    return event;
  }

  update(id: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${id} event`;
  }

  async remove(id: number) {
    return await this.database.event.delete({ where: { id } });
  }
}

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createEventDto: CreateEventDto) {
    const event = this.eventsRepository.create()
    const user = await this.usersRepository.findOneBy({ id: createEventDto.responsableId })

    event.address = createEventDto.address
    event.city = createEventDto.city
    event.complement = createEventDto.complement
    event.email = createEventDto.email
    event.eventDate = createEventDto.eventDate
    event.fone = createEventDto.fone
    event.name = createEventDto.name
    event.state = createEventDto.state
    event.responsable = user

    return this.eventsRepository.save(event)
  }

  // findAll() {
  //   return `This action returns all events`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}

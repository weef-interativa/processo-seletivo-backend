import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from '../dto/create-event.dto';
import { UpdateEventDto } from '../dto/update-event.dto';
import { Event } from '../entities/event.entity';
import { EventAddress } from '../entities/event_address.entity';
import { IEventQuery } from '../models/event-query';
import { User } from './../../users/entities/user.entity';
import { EventsAddressService } from './events-address.service';
import { EventCloudinaryService } from './events-cloudinary-upload.service';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventAddress)
    private readonly eventAddressRepository: Repository<EventAddress>,
    private readonly eventCloudinaryService: EventCloudinaryService,
    private readonly eventAddressService: EventsAddressService,
  ) {}

  async create(createEventDto: CreateEventDto, user: User) {
    const {
      email,
      name,
      phone,
      eventDate,
      responsible,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    } = createEventDto;

    const address: Partial<EventAddress> = {
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    };

    let eventAddress = await this.eventAddressService.addressAlreadyExists(
      address,
      eventDate,
    );

    if (!eventAddress) {
      eventAddress = await this.eventAddressRepository.save(address);
    }

    const event = await this.eventRepository.save({
      email,
      eventDate,
      name,
      phone,
      userId: user.id,
      responsible,
      eventAddressId: eventAddress.id,
    });

    const eventFound = await this.eventRepository.findOne({
      where: {
        id: event.id,
      },
      relations: {
        address: true,
        images: true,
      },
    });

    return eventFound;
  }

  async findAll(queries: IEventQuery) {
    const events = await this.eventRepository.find({
      where: {
        email: queries.email,
        phone: queries.phone,
        responsible: queries.responsible,
        name: queries.name,
        address: {
          zipCode: queries.zipCode,
          state: queries.state,
          city: queries.city,
          street: queries.street,
          number: queries.number,
        },
      },
      relations: {
        images: true,
        address: true,
      },
    });
    return events;
  }

  async findOneById(id: number) {
    const event = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: {
        images: true,
        address: true,
      },
    });
    if (!event) {
      throw new HttpException(
        'This event does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }
    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const {
      email,
      name,
      phone,
      eventDate,
      responsible,
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    } = updateEventDto;

    const eventToUpdate = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ['images', 'address', 'address.events'],
    });

    const isTheSameAddress =
      eventToUpdate.address.zipCode === zipCode &&
      eventToUpdate.address.street === street &&
      eventToUpdate.address.number === number;

    const address = {
      zipCode: zipCode || eventToUpdate.address.zipCode,
      state: state || eventToUpdate.address.state,
      city: city || eventToUpdate.address.city,
      street: street || eventToUpdate.address.street,
      number: number || eventToUpdate.address.number,
      complement: complement || eventToUpdate.address.complement,
    };

    const eventAddress =
      await this.eventAddressService.createOrUpdateEventAddress(
        isTheSameAddress,
        eventToUpdate,
        address,
        eventDate,
      );

    await this.eventRepository.save({
      id,
      email,
      eventDate,
      name,
      phone,
      responsible,
      eventAddressId: eventAddress?.id || eventToUpdate.eventAddressId,
    });

    const updatedEvent = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: {
        address: true,
        images: true,
      },
    });

    return updatedEvent;
  }

  async remove(id: number) {
    const actualEvent = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ['address', 'address.events', 'images'],
    });

    if (actualEvent.images.length > 0) {
      await this.eventCloudinaryService.deleteImageFromCloudinary(
        actualEvent.images,
      );
    }
    await this.eventRepository.delete({ id });
    await this.eventAddressService.deleteAddressIfIsNotBeingUsed(
      actualEvent.address,
    );
  }
}

import { User } from './../users/entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entities/event.entity';
import { EventAddress } from './entities/event_address.entity';
import { EventImage } from './entities/event_image.entity';
import { CreateEventImageDto } from './dto/create-event-image.dto';
import * as moment from 'moment';
import { EventCloudinaryService } from './services/events-cloudinary-upload.service';
// import { ISO_8601 } from 'moment';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(EventImage)
    private readonly eventImageRepository: Repository<EventImage>,
    @InjectRepository(EventAddress)
    private readonly eventAddressRepository: Repository<EventAddress>,
    private readonly eventCloudinaryService: EventCloudinaryService,
  ) {}

  async create(createEventDto: CreateEventDto, user: User) {
    const {
      email,
      name,
      images,
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

    const address = {
      zipCode,
      state,
      city,
      street,
      number,
      complement,
    };

    let eventAddress = await this.addressAlreadyExists(address, eventDate);

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

  async updateEventImage(
    createEventImagesDto: CreateEventImageDto[],
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

  async findAll() {
    const events = await this.eventRepository.find({
      relations: {
        images: true,
        address: true,
      },
    });
    return events;
  }

  async findOneById(id: number) {
    const events = await this.eventRepository.find({
      where: {
        id,
      },
      relations: {
        images: true,
        address: true,
      },
    });
    return events;
  }

  async update(id: number, updateEventDto: UpdateEventDto) {
    const {
      email,
      name,
      images,
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
    let eventAddress: EventAddress;

    const isTheSameAddress =
      eventToUpdate.address.zipCode === zipCode &&
      eventToUpdate.address.street === street &&
      eventToUpdate.address.number === number;
    if (isTheSameAddress) {
      await this.checkAddressAvailability(eventToUpdate.address, eventDate);
    } else {
      const address = {
        zipCode: zipCode || eventToUpdate.address.zipCode,
        state: state || eventToUpdate.address.state,
        city: city || eventToUpdate.address.city,
        street: street || eventToUpdate.address.street,
        number: number || eventToUpdate.address.number,
        complement: complement || eventToUpdate.address.complement,
      };
      eventAddress = await this.addressAlreadyExists(address, eventDate);

      if (!eventAddress) {
        eventAddress = await this.eventAddressRepository.save(address);
      }
      eventAddress = await this.eventAddressRepository.save({
        ...address,
        id: eventToUpdate.address.id,
      });
    }

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
    if (!actualEvent) {
      throw new HttpException("This id doesn't exist.", HttpStatus.NOT_FOUND);
    }
    if (actualEvent.images.length > 0) {
      await this.eventCloudinaryService.deleteImageFromCloudinary(
        actualEvent.images,
      );
    }
    await this.deleteAddressIfIsNotBeingUsed(actualEvent.address);
    await this.eventRepository.delete({ id });
  }

  async addressAlreadyExists(
    address: any,
    eventDate: Date,
  ): Promise<EventAddress> {
    const addressWithEvents = await this.eventAddressRepository.findOne({
      where: {
        zipCode: address.zipCode,
        street: address.street,
        number: address.number,
      },
      relations: {
        events: true,
      },
    });
    if (addressWithEvents) {
      await this.checkAddressAvailability(addressWithEvents, eventDate);
      return addressWithEvents;
    }
  }

  async checkAddressAvailability(
    address: Omit<EventAddress, 'createdAt' | 'updatedAt' | 'complement'>,
    eventDate: Date,
  ) {
    const hasAnEventInThisDate = address.events.some((event) =>
      moment(event.eventDate).isSame(eventDate, 'date'),
    );
    if (hasAnEventInThisDate) {
      throw new HttpException(
        'There is already an event scheduled at this location on this date.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async deleteAddressIfIsNotBeingUsed(address) {
    const addressHasMoreThanOneEvent = address.events.length > 1;
    if (!addressHasMoreThanOneEvent) {
      await this.eventAddressRepository.delete(address.id);
    }
  }
}

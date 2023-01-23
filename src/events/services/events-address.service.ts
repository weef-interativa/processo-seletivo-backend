import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { EventAddress } from './../entities/event_address.entity';

@Injectable()
export class EventsAddressService {
  constructor(
    @InjectRepository(EventAddress)
    private readonly eventAddressRepository: Repository<EventAddress>,
  ) {}

  async createOrUpdateEventAddress(
    isTheSameAddress: boolean,
    eventToUpdate: Event,
    addressSent: Partial<EventAddress>,
    eventDate: Date,
  ): Promise<EventAddress | undefined> {
    let eventAddress: EventAddress;
    if (isTheSameAddress) {
      await this.checkAddressAvailability(
        eventToUpdate.address,
        eventDate,
        true,
      );
    } else {
      eventAddress = await this.addressAlreadyExists(addressSent, eventDate);

      if (!eventAddress) {
        eventAddress = await this.eventAddressRepository.save(addressSent);
      } else {
        eventAddress = await this.eventAddressRepository.save({
          ...addressSent,
          id: eventToUpdate.address.id,
        });
      }
    }
    return eventAddress;
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
    isUpdate = false,
  ) {
    const eventsIntThisDate = address.events.filter((event) =>
      moment(event.eventDate).isSame(eventDate, 'date'),
    );
    let hasAnEventInThisDate = eventsIntThisDate.length > 0;

    if (isUpdate) {
      hasAnEventInThisDate = eventsIntThisDate.length > 1;
    }

    if (hasAnEventInThisDate) {
      throw new HttpException(
        'There is already an event scheduled at this location on this date.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async deleteAddressIfIsNotBeingUsed(address: EventAddress) {
    const addressHasMoreThanOneEvent = address.events.length > 1;
    if (!addressHasMoreThanOneEvent) {
      await this.eventAddressRepository.delete(address.id);
    }
  }
}

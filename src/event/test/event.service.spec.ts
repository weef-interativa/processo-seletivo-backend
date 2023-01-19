import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { EventsService } from '../event.service';
import Event from '../entities/event.entity';
import User from '../../user/user.entity';
import * as crypto from 'crypto';
import CreateEventDTO from '../dto/create-event.dto';
import UpdateEventDTO from '../dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import EventImage from '../entities/event-image.entity';

describe('UsersController', () => {
  let eventsService: EventsService;
  let eventsRepository: Repository<Event>;
  let eventImagesRepository: Repository<EventImage>;

  const userMock = new User({
    id: crypto.randomUUID(),
    username: 'userMock',
  });

  const eventsMock = [
    new Event({
      id: crypto.randomUUID(),
      name: 'Event1',
      responsible: userMock,
    }),
    new Event({
      id: crypto.randomUUID(),
      name: 'Event2',
      responsible: userMock,
    }),
  ];

  const requestMock = {
    user: userMock,
  } as unknown as Request;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        EventsService,
        {
          provide: getRepositoryToken(Event),
          useValue: {
            find: jest.fn().mockResolvedValue(eventsMock),
            findOneOrFail: jest.fn().mockResolvedValue(eventsMock[0]),
            save: jest.fn().mockResolvedValue(eventsMock[0]),
            delete: jest
              .fn()
              .mockResolvedValue({ affected: 1 } as DeleteResult),
          },
        },
        {
          provide: getRepositoryToken(EventImage),
          useValue: {
            find: jest.fn().mockResolvedValue([new EventImage()]),
          },
        },
      ],
    }).compile();

    eventsService = module.get(EventsService);
    eventImagesRepository = module.get(getRepositoryToken(EventImage));
    eventsRepository = module.get(getRepositoryToken(Event));
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(eventsService).toBeDefined();
      expect(eventsRepository).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await eventsService.findAll();

      expect(eventsRepository.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock);
    });
  });

  describe('findOne', () => {
    it('should return one event given its id', async () => {
      const result = await eventsService.findOne(eventsMock[0].id);

      expect(eventsRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });

  describe('create', () => {
    it('should create an event and return it', async () => {
      const result = await eventsService.create(
        userMock.id,
        eventsMock[0] as CreateEventDTO,
      );

      expect(eventsRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });
  describe('update', () => {
    it('should update an event and return the updated fields', async () => {
      const result = await eventsService.update(
        eventsMock[0].id,
        eventsMock[0] as UpdateEventDTO,
      );

      expect(eventsRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });

  describe('delete', () => {
    it('should delete an event and return true', async () => {
      const result = await eventsService.delete(eventsMock[0].id);

      expect(eventsRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).toBe(true);
    });

    it('should return false when no event is found', () => {
      jest
        .spyOn(eventsRepository, 'delete')
        .mockResolvedValueOnce({ affected: 0 } as DeleteResult);
      const result = eventsService.delete(eventsMock[0].id);

      expect(eventsRepository.delete).toHaveBeenCalledTimes(1);
      expect(result).resolves.toBe(false);
    });
  });
});

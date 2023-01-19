import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import { EventsController } from '../event.controller';
import { EventsService } from '../event.service';
import Event from '../entities/event.entity';
import User from '../../user/user.entity';
import * as crypto from 'crypto';
import CreateEventDTO from '../dto/create-event.dto';
import UpdateEventDTO from '../dto/update-event.dto';
import { NotFoundException } from '@nestjs/common';

describe('UsersController', () => {
  let eventsController: EventsController;
  let eventsService: EventsService;

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
      controllers: [EventsController],
      providers: [
        {
          provide: EventsService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(eventsMock),
            findOne: jest.fn().mockResolvedValue(eventsMock[0]),
            create: jest.fn().mockResolvedValue(eventsMock[0]),
            update: jest.fn().mockResolvedValue(eventsMock[0]),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
      ],
    }).compile();

    eventsController = module.get(EventsController);
    eventsService = module.get(EventsService);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(eventsController).toBeDefined();
      expect(eventsService).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all events', async () => {
      const result = await eventsController.findAll();

      expect(eventsService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock);
    });
  });

  describe('findOne', () => {
    it('should return one event given its id', async () => {
      const result = await eventsController.findOne(eventsMock[0].id);

      expect(eventsService.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });

  describe('create', () => {
    it('should create an event and return it', async () => {
      const result = await eventsController.create(
        requestMock,
        eventsMock[0] as CreateEventDTO,
      );

      expect(eventsService.create).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });

  describe('update', () => {
    it('should update an event and return the updated fields', async () => {
      const result = await eventsController.update(
        eventsMock[0].id,
        eventsMock[0] as UpdateEventDTO,
      );

      expect(eventsService.update).toHaveBeenCalledTimes(1);
      expect(result).toEqual(eventsMock[0]);
    });
  });

  describe('delete', () => {
    it('should delete an event and return undefined', async () => {
      const result = await eventsController.delete(eventsMock[0].id);

      expect(eventsService.delete).toHaveBeenCalledTimes(1);
      expect(result).toBeUndefined();
    });

    it('should throw a not found exception when no event is found', () => {
      jest.spyOn(eventsService, 'delete').mockResolvedValueOnce(false);
      const result = eventsController.delete(eventsMock[0].id);

      expect(eventsService.delete).toHaveBeenCalledTimes(1);
      expect(result).rejects.toThrowError(NotFoundException);
    });
  });
});

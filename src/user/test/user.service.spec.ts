import { Test, TestingModule } from '@nestjs/testing';
import { Request } from 'express';
import User from '../../user/user.entity';
import * as crypto from 'crypto';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('UsersController', () => {
  let usersService: UserService;
  let usersRepository: Repository<User>;

  const userMock = new User({
    id: crypto.randomUUID(),
    username: 'userMock',
    password: bcrypt.hashSync('passwordMock', 10),
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
            findOneOrFail: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    usersService = module.get(UserService);
    usersRepository = module.get(getRepositoryToken(User));
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(usersService).toBeDefined();
      expect(usersRepository).toBeDefined();
    });
  });

  describe('findOne', () => {
    it('should return one user given its id', async () => {
      const result = await usersService.findOne(userMock.id);

      expect(usersRepository.findOneOrFail).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userMock);
    });
  });

  describe('getUserByCredentials', () => {
    it('should create one user given its credentials', async () => {
      const result = await usersService.getUserByCredentials({
        username: userMock.username,
        password: 'passwordMock',
      });

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userMock);
    });

    it('should return null when credentials are incorrect', async () => {
      const result = await usersService.getUserByCredentials({
        username: userMock.username,
        password: 'passwordMock2',
      });

      expect(usersRepository.findOne).toHaveBeenCalledTimes(1);
      expect(result).toBe(null);
    });
  });

  describe('createUserAccount', () => {
    it('should create a new user', async () => {
      const result = await usersService.createUserAccount({
        username: userMock.username,
        password: userMock.password,
      });

      expect(usersRepository.save).toHaveBeenCalledTimes(1);
      expect(result).toEqual(userMock);
    });

    it('should throw an error when username already exists', () => {
      jest.spyOn(usersRepository, 'save').mockRejectedValueOnce(new Error());
      const result = usersService.createUserAccount({
        username: userMock.username,
        password: userMock.password,
      });

      expect(result).rejects.toThrowError();
    });
  });
});

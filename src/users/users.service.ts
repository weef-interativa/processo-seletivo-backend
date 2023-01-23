import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
    };

    const userAlreadyExists = await this.findByUsername(createUserDto.username);

    if (userAlreadyExists) {
      throw new HttpException(
        'Username already exists.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const user = await this.userRepository.save(data);
    return plainToInstance(User, user);
  }

  findAll(): User {
    const users = this.userRepository.find();
    return plainToInstance(User, users);
  }

  findOne(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        events: true,
      },
    });
    return plainToInstance(User, user);
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });
    return user;
  }
}

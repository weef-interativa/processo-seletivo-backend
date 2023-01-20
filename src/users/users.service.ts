import { User } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { instanceToPlain } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions';
import { HttpStatus } from '@nestjs/common/enums';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
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
    return user;
  }

  findAll() {
    const users = this.userRepository.find();
    return instanceToPlain(users);
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({ id });
    return instanceToPlain(user);
  }

  findByUsername(username: string) {
    const user = this.userRepository.findOneBy({ username });
    return user;
  }
}

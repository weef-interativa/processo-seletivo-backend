import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import User from './user.entity';
import SignInDTO from 'src/auth/dto/signin.dto';
import SignUpDTO from 'src/auth/dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async getUserByCredentials(credentials: SignInDTO) {
    const user = await this.usersRepository.findOne({
      where: { username: credentials.username },
    });

    if (user && (await bcrypt.compare(credentials.password, user.password))) {
      return user;
    }
    return null;
  }

  async createUserAccount(credentials: SignUpDTO) {
    const hashedPassword = await bcrypt.hash(credentials.password, 10);
    const user = await this.usersRepository
      .save({
        username: credentials.username,
        password: hashedPassword,
      })
      .catch(() => {
        throw new UnauthorizedException('Username already in use');
      });
    return user;
  }

  async findOne(id: string) {
    return this.usersRepository.findOneOrFail({ where: { id: id } });
  }
}

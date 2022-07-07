import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import CreateUserDto from './dto/create-user.dto';
import User from './entities/users.entity';
 
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async create(data: CreateUserDto) : Promise<User> {
    const user = await this.usersRepository.findOneBy({email: data.email})

    if (user) {
      throw new HttpException('Usuario já cadastrado', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.usersRepository.create(data);

    return await this.usersRepository.save(newUser);
  }
 
  async getById(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    
    if (!user) {
        throw new HttpException(`Usuario com o ${id} não encontrado.`, HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async getByEmail(email: string) : Promise<User> {
    const user = await this.usersRepository.findOneBy({ email });

    if (!user) {
        throw new HttpException('Usuario não encontrado', HttpStatus.NOT_FOUND);
    }

    return user;
  }
 
}
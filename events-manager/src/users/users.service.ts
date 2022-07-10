import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create();

		if(await this.validateEmail(createUserDto.email)) throw new BadRequestException("O E-mail informado já foi cadastrado.")

    user.email = createUserDto.email;
    user.name = createUserDto.name;
    user.password = bcryptjs.hashSync(createUserDto.password);

    return this.usersRepository.save(user);
  }

	async validateEmail(email: string): Promise<boolean> {
		const user = await this.usersRepository.findOneBy({ email })

		return !!user
	}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.usersRepository.findOneBy({ id });
  }

	findOneByEmailOrFail(email: string): Promise<User> {
		return this.usersRepository.findOneByOrFail({ email })
	}

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOneBy({ id });
    user.email = updateUserDto.email;
    user.name = updateUserDto.name;
    user.password = bcryptjs.hashSync(updateUserDto.password);
    return this.usersRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}

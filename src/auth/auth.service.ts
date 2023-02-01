import { UserService } from './../users/users.service';
import { IUserPayload } from './models/user.payload';
import { User } from './../users/entities/user.entity';
import { HttpStatus } from '@nestjs/common/enums';
import { instanceToPlain } from 'class-transformer';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common/exceptions';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async validateUser(username: string, password: string) {
    const user = await this.userService.findByUsername(username);
    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        return instanceToPlain({
          ...user,
        });
      }
    }
    throw new HttpException(
      'Wrong username or password.',
      HttpStatus.FORBIDDEN,
    );
  }

  login(userData: User): { token: string } {
    const payload: IUserPayload = {
      sub: userData.id,
      username: userData.username,
    };
    const token = this.jwtService.sign(payload);
    return { token };
  }
}

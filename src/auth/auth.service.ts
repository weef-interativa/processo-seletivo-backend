import { User } from '.prisma/client';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { DatabaseService } from '../database/database.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService, private jwt: JwtService, private config: ConfigService) {}

  async createUser(auth: AuthDto) {
    const hash = await argon.hash(auth.password);
    try {
      const newUser = await this.database.user.create({
        data: {
          email: auth.email,
          hash: hash,
        },
      });
      return this.createToken(newUser);
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('credentials exists');
        }
      }

      throw err;
    }
  }

  async login(auth: AuthDto) {
    const user = await this.database.user.findUnique({
      where: { email: auth.email },
    });
    if (user === null) {
      throw new ForbiddenException('credentials not found');
    }
    if (!argon.verify(user.hash, auth.password)) {
      throw new ForbiddenException('credentials not found');
    }

    return this.createToken(user);
  }

  private async createToken(user: User) {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}

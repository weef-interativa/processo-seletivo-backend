import { ForbiddenException, Injectable } from '@nestjs/common';
import * as argon from 'argon2';
import { DatabaseService } from 'src/database/database.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private database: DatabaseService) {}

  async createUser(auth: AuthDto) {
    const hash = await argon.hash(auth.password);
    const newUser = await this.database.user.create({
      data: {
        email: auth.email,
        hash: hash,
      },
    });

    return newUser;
  }

  async login(auth: AuthDto) {
    const user = await this.database.user.findUnique({
      where: { email: auth.email },
    });
    if (user === undefined) {
      throw new ForbiddenException('credentials not found');
    }
    if (!argon.verify(user.hash, auth.email)) {
      throw new ForbiddenException('credentials not found');
    }

    return user;
  }
}

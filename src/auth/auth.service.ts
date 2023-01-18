import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import SignInDTO from './dto/signin.dto';
import SignUpDTO from './dto/signup.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UserService,
  ) {}

  async signIn(credentials: SignInDTO) {
    const user = await this.usersService.getUserByCredentials(credentials);
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(credentials: SignUpDTO) {
    const user = await this.usersService.createUserAccount(credentials);
    const payload = {
      sub: user.id,
      username: user.username,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validate(credentials: SignInDTO) {
    return (await this.usersService.getUserByCredentials(credentials)) || null;
  }
}

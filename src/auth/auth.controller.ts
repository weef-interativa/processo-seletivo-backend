import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  signup(@Body() auth: AuthDto) {
    return this.auth.createUser(auth);
  }

  @Post('login')
  login(@Body() auth: AuthDto) {
    return this.auth.login(auth);
  }
}

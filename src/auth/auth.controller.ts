import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SkipJwt } from './decorators/skip-jwt.decorator';
import SignInDTO from './dto/signin.dto';
import SignUpDTO from './dto/signup.dto';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @SkipJwt()
  @UseGuards(AuthGuard('local'))
  @Post('/signin')
  signIn(@Body() credentials: SignInDTO) {
    return this.authService.signIn(credentials);
  }

  @SkipJwt()
  @Post('/signup')
  signUp(@Body() credentials: SignUpDTO) {
    return this.authService.signUp(credentials);
  }
}

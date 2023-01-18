import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SkipJwt } from './decorators/skip-jwt.decorator';
import GetMeDTO from './dto/get-me.dto';
import SignInDTO from './dto/signin.dto';
import SignUpDTO from './dto/signup.dto';

@ApiTags('auth')
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

  @ApiBearerAuth()
  @Get('/me')
  async getMe(@Request() req) {
    return {
      id: req.user.id,
      username: req.user.username,
    } as GetMeDTO;
  }
}

import { AuthGuard } from '@nestjs/passport';
import { IsPublic } from './decorators/is-public.decorator';
import { AuthService } from './auth.service';
import { Controller, Post, HttpCode, UseGuards } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { Request } from '@nestjs/common/decorators';
import { AuthRequest } from './models/user.request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @IsPublic()
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() request: AuthRequest) {
    return this.authService.login(request.user);
  }
}

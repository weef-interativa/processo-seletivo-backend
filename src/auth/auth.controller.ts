import { AuthService } from './auth.service';
import { Controller, Post, HttpCode, UseGuards, Body } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Request } from '@nestjs/common/decorators';
import { AuthRequest } from './models/user.request';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() request: AuthRequest) {
    return this.authService.login(request.user);
  }
}

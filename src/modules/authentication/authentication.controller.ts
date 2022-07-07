import { Body, Req, Controller, HttpCode, Post, UseGuards, HttpStatus, Res, Response } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import CreateUserDto from '../users/dto/create-user.dto';
import { LocalAuthenticationGuard } from './strategies/local-authentication.guard';
import RequestWithUser from './interfaces/request-with-user.interface';
import ResponseService from 'src/helpers/json-response';
 
@Controller('authentication')
export class AuthenticationController {
  constructor(
    private readonly authenticationService: AuthenticationService
  ) {}
 
  @Post('register')
  async register(@Body() registrationData: CreateUserDto) {
    const result = await this.authenticationService.register(registrationData);
    
    return ResponseService.json("Usuário cadastrado com sucesso", true, [result])
  }
 
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser) {
    const {user} = request;
    const token = this.authenticationService.getJwtToken(user.id);
    request.res.setHeader('bearer-token', token);

    delete user.password;

    return ResponseService.json('Usuario logado com sucesso', true, [user])
  }
}
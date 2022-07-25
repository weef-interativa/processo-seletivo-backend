import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { AuthService } from './auth.service';
import { GetUser } from './decorator';
import { AccessTokenDto, AuthDto, UserDto } from './dto';
import { JwtGuard } from './guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private auth: AuthService) {}

  @ApiCreatedResponse({
    type: AccessTokenDto,
  })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'create an user' })
  async signup(@Body() auth: AuthDto) {
    return { access_token: await this.auth.createUser(auth) };
  }

  @ApiOperation({ summary: 'login user' })
  @ApiOkResponse({
    status: 200,
    type: AccessTokenDto,
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() auth: AuthDto): Promise<AccessTokenDto> {
    return { access_token: await this.auth.login(auth) };
  }

  @ApiOperation({ summary: 'get user information' })
  @ApiBearerAuth()
  @ApiOkResponse({
    status: 200,
    type: UserDto,
  })
  @UseGuards(JwtGuard)
  @Get('me')
  me(@GetUser() user: User) {
    return user;
  }
}

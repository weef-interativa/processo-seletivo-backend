import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcryptjs';
import { create } from "domain";
import ResponseService from "src/helpers/json-response";
import CreateUserDto from "../users/dto/create-user.dto";
import { UsersService } from "../users/users.service";

@Injectable()
export class AuthenticationService {
    constructor(
      private readonly usersService: UsersService,
      private readonly jwtService: JwtService,
      private readonly configService: ConfigService
    ) {}
   
    public async register(data: CreateUserDto) {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const createdUser = await this.usersService.create({
          ...data,
          password: hashedPassword
        });

        if(!createdUser){
          throw new HttpException(ResponseService.json('Usuario não pode ser criado', false), HttpStatus.INTERNAL_SERVER_ERROR);
        }
        delete createdUser.password
        return createdUser;
    }

    public async getAuthenticatedUser(email: string, plainTextPassword: string) {
        const user = await this.usersService.getByEmail(email);

        if(!user){
          throw new HttpException(ResponseService.json('Usuario não encontrado', false), HttpStatus.NOT_FOUND);
        }

        await this.verifyPassword(plainTextPassword, user.password);

        return user;
    }
     
    private async verifyPassword(plainTextPassword: string, hashedPassword: string) {
      
      const isPasswordMatching = await bcrypt.compare(
        plainTextPassword,
        hashedPassword
      );

      if (!isPasswordMatching) {
        throw new HttpException('Verique email ou senha', HttpStatus.BAD_REQUEST);
      }
    }

    public getJwtToken(userId: number) {
      const payload: TokenPayload = { userId };
      return this.jwtService.sign(payload);
    }
  }
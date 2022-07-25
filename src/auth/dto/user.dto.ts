import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class UserDto {
  @ApiProperty()
  @IsNumber()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  createAt: Date;

  @ApiProperty()
  updateAt: Date;
}

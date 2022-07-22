import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, isString, IsString } from 'class-validator';

export class CreateEventDto {
  @Type(() => Date)
  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  complement?: string;

  @IsNotEmpty()
  @IsString()
  responsible: string;

  @IsNotEmpty()
  @IsString()
  phone: string;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
} from 'class-validator';
import EventImageDTO from './create-event-image.dto';

export default class CreateEventDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  eventDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  complement: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  phone: string;

  @ApiProperty({ type: [EventImageDTO] })
  @IsNotEmpty()
  images: EventImageDTO[];
}

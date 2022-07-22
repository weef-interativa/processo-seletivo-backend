import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsString } from 'class-validator';
import { CreateEventDto } from './create-event.dto';

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @IsDate()
  date?: Date;

  @IsString()
  city?: string;

  @IsString()
  state?: string;

  @IsString()
  address?: string;

  @IsString()
  complement?: string;

  @IsString()
  responsible?: string;

  @IsString()
  phone?: string;
}

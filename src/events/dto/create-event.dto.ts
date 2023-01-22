import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Festa neon',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2020-07-13 18:00:00.000',
    description: 'The date should be in ISO 8601 format ',
  })
  @IsDateString()
  eventDate: Date;

  @ApiProperty({
    example: 'Guilherme',
  })
  @IsString()
  responsible: string;

  @ApiProperty({
    example: 'gui@gmail.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '47 996593527',
  })
  @IsPhoneNumber('BR')
  phone: string;

  images: string[];

  @ApiProperty({
    example: '01153-000',
  })
  @IsString()
  zipCode: string;

  @ApiProperty({
    example: 'São Paulo/SP',
  })
  @IsString()
  state: string;

  @ApiProperty({
    example: 'Adamantina',
  })
  @IsString()
  city: string;

  @ApiProperty({
    example: 'Rua Vitorino Carmilo',
  })
  @IsString()
  street: string;

  @ApiProperty({
    example: '123',
  })
  @IsNumber()
  number: number;

  @ApiProperty({
    example: 'Near the coffee shop',
  })
  @IsOptional()
  @IsString()
  complement: string;
}

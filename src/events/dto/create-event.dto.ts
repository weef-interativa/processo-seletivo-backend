import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinDate,
} from 'class-validator';

export class CreateEventDto {
  @ApiProperty({
    example: 'Festa neon',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2023-07-13 18:00:00.000',
    description: "This field doesn't accept old dates.",
  })
  @Transform(({ value }) => new Date(value))
  @MinDate(new Date())
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

  @ApiPropertyOptional({
    example: 'Near the coffee shop',
  })
  @IsOptional()
  @IsString()
  complement: string;
}

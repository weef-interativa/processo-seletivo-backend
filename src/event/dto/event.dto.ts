import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { ImageDto } from './image.dto';

export class EventDto {
  @ApiProperty()
  @IsInt()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  address: string;

  @ApiPropertyOptional()
  complement?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  responsible: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({
    type: ImageDto,
    isArray: true,
  })
  images: ImageDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

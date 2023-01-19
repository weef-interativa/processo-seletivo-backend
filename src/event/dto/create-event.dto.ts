import { ApiProperty } from '@nestjs/swagger';
import EventImageDTO from './create-event-image.dto';

export default class CreateEventDTO {
  @ApiProperty()
  eventDate: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  state: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  complement: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  phone: string;

  @ApiProperty({ type: [EventImageDTO] })
  images: EventImageDTO[];
}

import { ApiPropertyOptional } from '@nestjs/swagger';
import EventImageDTO from './create-event-image.dto';

export default class UpdateEventDTO {
  @ApiPropertyOptional()
  eventDate?: Date;

  @ApiPropertyOptional()
  name?: string;

  @ApiPropertyOptional()
  city?: string;

  @ApiPropertyOptional()
  state?: string;

  @ApiPropertyOptional()
  address?: string;

  @ApiPropertyOptional()
  complement?: string;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  phone?: string;

  @ApiPropertyOptional({ type: [EventImageDTO] })
  images?: EventImageDTO[];
}

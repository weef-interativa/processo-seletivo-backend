import { ApiProperty } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class CreateEventDto2 {
  @ApiProperty()
  data: CreateEventDto;
}

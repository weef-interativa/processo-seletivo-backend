import { ApiProperty } from '@nestjs/swagger';

export default class EventImageDTO {
  @ApiProperty()
  url: string;
}

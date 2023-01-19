import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export default class EventImageDTO {
  @ApiProperty()
  @IsUrl()
  url: string;
}

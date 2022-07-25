import { ApiProperty } from '@nestjs/swagger';

export class ImageDto {
  @ApiProperty()
  int: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  path: string;

  @ApiProperty()
  event: number;
}

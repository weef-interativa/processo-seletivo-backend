import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventsImages {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'This field accepts images with JPG/JPEG/PNG and GIFT format',
  })
  files: any[];
}

import { UpdateImagesDTO } from './update-images.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class CreateEventsImages extends UpdateImagesDTO {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'This field accepts images with JPG/JPEG/PNG and GIFT format',
    example: 'image.png',
  })
  files: any[];
}

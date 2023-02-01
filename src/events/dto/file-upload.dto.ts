import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateEventDto } from './create-event.dto';

export class FilesUploadDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
      description:
        'This field accepts images with JPG/JPEG/PNG and GIFT format',
    },
  })
  files: Express.Multer.File[];

  @ApiPropertyOptional()
  data: CreateEventDto;
}

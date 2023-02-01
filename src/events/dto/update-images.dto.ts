import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateImagesDTO {
  @ApiPropertyOptional({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'This field accepts images with JPG/JPEG/PNG and GIFT format',
  })
  files: Express.Multer.File[];

  @ApiPropertyOptional({
    example: {
      imagesToDelete: [1, 2],
    },
    description: 'This field receives a array of id images to delete',
  })
  data: {
    imagesToDelete: number[];
  };
}

import { ClassSerializerInterceptor, Controller, Get, Param, Res, StreamableFile, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { Readable } from 'stream';

import { EventImagesService } from './event-images.service';

   
  @Controller('event-images')
  @UseInterceptors(ClassSerializerInterceptor)
  export default class EventImagesController {
    constructor(
      private readonly eventImagesService: EventImagesService
    ) {}
   
    @Get(':id')
    async find(@Res({ passthrough: true }) response: Response, @Param('id') id: string) {
      const image = await this.eventImagesService.findOne(+id);
   
      const stream = Readable.from(image.data);

    // stream.pipe(response);
      response.set({
        'Content-Disposition': `inline; filename="${image.filename}"`,
        'Content-Type': 'image'
      });

      return new StreamableFile(stream);
    }
  }
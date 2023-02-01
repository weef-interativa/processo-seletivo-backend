import { Injectable } from '@nestjs/common';
import { unlink } from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import { EventImage } from '../entities/event_image.entity';

@Injectable()
export class EventCloudinaryService {
  async uploadImageToCloudinary(
    files: Array<Express.Multer.File>,
    id: string,
  ): Promise<Partial<EventImage>[]> {
    const eventImagesDTO: Partial<EventImage>[] = [];

    for (let i = 0; i < files.length; i += 1) {
      const upload = await cloudinary.uploader.upload(
        files[i].path,
        (error, result) => result,
      );
      if (upload) {
        unlink(files[i].path, (error) => {
          if (error) {
            console.log(error);
          }
        });
      }
      const eventImageDTO = {
        assetId: upload.public_id,
        eventId: +id,
        fileName: upload.original_filename,
        url: upload.url,
      };
      eventImagesDTO.push(eventImageDTO);
    }
    return eventImagesDTO;
  }

  async deleteImageFromCloudinary(imagesToDelete: EventImage[]) {
    for (let i = 0; i < imagesToDelete.length; i += 1) {
      await cloudinary.uploader.destroy(
        imagesToDelete[i].assetId,
        (error, result) => result,
      );
    }
  }
}

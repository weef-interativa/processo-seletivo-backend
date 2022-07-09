import { Body, Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CreateImageDto } from './dtos/create-image.dto';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
	constructor(private readonly imagesService: ImagesService) {}

	@Post()
	@UseInterceptors(FileInterceptor('photo', {
		storage: diskStorage({
			destination: './files',
			filename: (req, file, cb) => {
				const fileNameSplit = file.originalname.split(".")
				const fileExt = fileNameSplit[fileNameSplit.length - 1];
				cb(null, `${Date.now()}.${fileExt}`)
			}
		})
	}))
  create(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto) {
    return this.imagesService.create({ eventId: createImageDto.eventId, path: file.path })
  }

}

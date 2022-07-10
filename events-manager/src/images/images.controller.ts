import { BadRequestException, Body, Controller, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { UnauthorizedDto } from 'src/auth/dtos/unauthorized.dto';
import { CreateImageDto } from './dtos/create-image.dto';
import { Image } from './entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
@ApiTags('Imagens')
@UseGuards(AuthGuard('jwt'))
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
	@ApiConsumes('multipart/form-data')
	@ApiOperation({ summary: 'Armazenar uma nova imagem.' })
	@ApiBearerAuth()
	@ApiResponse({
		status: 200,
		description: "A consulta foi executada com sucesso."
	})
	@ApiResponse({
		status: 401,
		description: "Erro: Usuário não autenticado.",
		type: UnauthorizedDto
	})
  async create(@UploadedFile() file: Express.Multer.File, @Body() createImageDto: CreateImageDto) {
		let result: Image
		try {
			result = await this.imagesService.create({ eventId: createImageDto.eventId, path: file.path })
		} catch (err) {
			throw new BadRequestException("Evento não encontrado.")
		}

		return result
  }

}

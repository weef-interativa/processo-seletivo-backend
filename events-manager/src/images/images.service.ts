import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { SaveImagePathDto } from './dtos/save-image-path.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
	constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

	async create(saveImagePathDto: SaveImagePathDto) {
		const image = this.imagesRepository.create()

		const id = saveImagePathDto.eventId
		const event = await this.eventsRepository.findOneByOrFail({ id })
		image.event = event
		image.path = saveImagePathDto.path

		return this.imagesRepository.save(image)
	}
}

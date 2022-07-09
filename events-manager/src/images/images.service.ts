import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from 'src/events/entities/event.entity';
import { Repository } from 'typeorm';
import { CreateImageDto } from './dtos/create-image.dto';
import { Image } from './entities/image.entity';

@Injectable()
export class ImagesService {
	constructor(
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,

    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}

	async create(createImageDto: CreateImageDto) {
		const image = this.imagesRepository.create()

		const id = createImageDto.eventId
		const event = await this.eventsRepository.findOneBy({ id })
		if(!event) throw new Error("Evento não encontrado. Impossível salvar a imagem.")
		image.event = event
		image.path = createImageDto.path

		return this.imagesRepository.save(image)
	}
}

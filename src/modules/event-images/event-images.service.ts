import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { QueryRunner, Repository } from "typeorm";
import EventImages from "./entities/event-images.entity";
import Events from "../events/entities/events.entity";

@Injectable()
export class EventImagesService {
    constructor(
        @InjectRepository(EventImages)
        private readonly eventImagesRepository: Repository<EventImages>
    ) {}

    async upload(images: Array<Express.Multer.File>, event: Events, queryRunner: QueryRunner) {
        for( const image of images) {
            const newImage = await queryRunner.manager.create(EventImages, {
                filename: image.originalname,
                data: image.buffer,
                event_id: event.id,
            })

            await queryRunner.manager.save(EventImages, newImage);
        }
    }

    async delete(ids: EventImages[], queryRunner: QueryRunner) {
        for(const id of ids) {
            const deleteResponse = await queryRunner.manager.delete(EventImages, { id });
            if(!deleteResponse.affected) {
                throw new HttpException(`Imagem com o id: ${id} não pode ser deletada`, HttpStatus.NOT_FOUND);
            }
        }
    }

    async findOne(id: number) {
        const image = await this.eventImagesRepository.findOneBy({id});
        if (!image) {
          throw new HttpException(`Imagem com o id: ${id} não pode ser encontrada`, HttpStatus.NOT_FOUND);
        }
        return image;
    }
}
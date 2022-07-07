import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { merge } from 'rxjs';
import { Connection, Repository } from 'typeorm';

import User from '../users/entities/users.entity';
import { UsersService } from '../users/users.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import Events from './entities/events.entity';
import { EventImagesService } from '../event-images/event-images.service';

@Injectable()
export class EventsService {
    constructor(
        @InjectRepository(Events)
        private readonly eventRepository: Repository <Events>,
        private readonly connection: Connection,
        private readonly eventImagesService: EventImagesService,
    ) {}
    
    async create(data: CreateEventDto, userData: User, files: Array<Express.Multer.File>) : Promise<Events>{
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const user : User = await queryRunner.manager.findOneBy(User, {id: userData.id});

            if (!user) {
                throw new HttpException('Responsável não é um usuário previamente cadastrado.', HttpStatus.BAD_REQUEST);
            }

            const newEvent : Events = queryRunner.manager.create(Events, {...data, id_responsible: userData.id});
            
            const savedNewEvent = await queryRunner.manager.save(newEvent);

            await this.eventImagesService.upload(files, savedNewEvent, queryRunner);

            await queryRunner.commitTransaction();

            return savedNewEvent;
        }catch(err){ 
            await queryRunner.rollbackTransaction();
            throw new HttpException(`Erro interno ao salvar o evento: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await queryRunner.release();
        }
    }

    async findAll() : Promise<Events[]>{
        return await this.eventRepository.find({relations:['user', 'images'], loadRelationIds:true});
    }

    async find(id: number) : Promise<Events> {
        return await this.eventRepository.findOneBy({id});
    }

    async update(id: number, data: UpdateEventDto) : Promise<Events> {
        const event : Events = await this.eventRepository.findOneBy({id});

        if(!event) {
            throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
        }

        const partialUpdatedEvent : Events = this.eventRepository.merge(
            event,
            data
        );

        return this.eventRepository.save(partialUpdatedEvent);
    }

    async remove(id: number){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try{
            const event : Events = await queryRunner.manager.findOne(Events, {where: {id}, relations: ['images'], loadRelationIds: true});

            if(!event) {
                throw new HttpException('Evento não encontrado', HttpStatus.NOT_FOUND);
            }

            if(event.images.length > 0) {
                await this.eventImagesService.delete(event.images, queryRunner)
            }
            queryRunner.manager.remove(event);

            await queryRunner.commitTransaction();

        }catch(err){ 
            await queryRunner.rollbackTransaction();
            throw new HttpException(`Erro interno ao salvar o evento: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
        } finally {
            await queryRunner.release();
        }
        
    }
}
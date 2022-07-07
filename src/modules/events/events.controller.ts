import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

import { FilesInterceptor } from '@nestjs/platform-express';
import ResponseService from '../../helpers/json-response';
import RequestWithUser from '../authentication/interfaces/request-with-user.interface';
import JwtAuthenticationGuard from '../authentication/strategies/jwt-authentication.guard';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import Events from './entities/events.entity';
import { EventsService } from './events.service';

@Controller('events')
@UseGuards(JwtAuthenticationGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files'))
  async create(@Req() request: RequestWithUser, @Body() createEventDto: CreateEventDto, @UploadedFiles() files: Array<Express.Multer.File>) {
    
    const {user} = request;


    const response: Events = await this.eventsService.create(createEventDto, user, files);

    
    return ResponseService.json("Evento criado com sucesso", true, [response]);
  }

  @Get()
  async findAll() {
    const response: Events[] = await this.eventsService.findAll();
    
    return ResponseService.json("Eventos buscados  com sucesso", true, [response]);
  }

  @Get('/:id')
  async find(@Param('id') id: string) {
    const response: Events = await this.eventsService.find(+id);

    return ResponseService.json("Evento buscados com sucesso", true, [response]);
  }

  @Patch('/:id')
  async update(@Body() updateEventDto: UpdateEventDto, @Param('id') id: string) {
    const response: Events = await this.eventsService.update(+id, updateEventDto);

    return ResponseService.json("Evento alterado com sucesso", true, [response]);
  }

  @Delete('/:id') 
  async remove(@Param('id') id: string) {
    await this.eventsService.remove(+id);
    
    return ResponseService.json("Evento removido com sucesso", true);
  }
}

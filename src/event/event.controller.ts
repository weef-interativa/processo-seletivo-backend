import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateEventDTO } from './DTOs/create-event.dto';
import { EventService } from './event.service';
import { ReturnEventDTO } from './DTOs/return-event.dto';
import { UpdateEventDTO } from './DTOs/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private eventService: EventService) {}

  @Post()
  async createEvent(
    @Body() createEventDTO: CreateEventDTO,
  ): Promise<ReturnEventDTO> {
    const event = await this.eventService.create(createEventDTO);
    return {
      event,
      message: 'User create successfully',
    };
  }

  @Get(':id')
  async findEvent(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const finded = await this.eventService.findByID(id);
    if (!finded.length) {
      res.status(HttpStatus.NOT_FOUND);
      return [];
    }
    res.status(HttpStatus.OK);
    return finded;
  }

  @Delete(':id')
  async deleteEvent(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const destroyed = await this.eventService.destroy(id);
    if (!destroyed.affected) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    res.status(HttpStatus.OK);
    return null;
  }

  @Put(':id')
  async updateEvent(
    @Param('id') id: string,
    @Body() updateEventDTO: UpdateEventDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    const updated = await this.eventService.update(id, updateEventDTO);
    if (!updated.affected) {
      res.status(HttpStatus.NOT_FOUND);
      return null;
    }
    res.status(HttpStatus.OK);
    return null;
  }
}

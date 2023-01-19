import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import CreateEventDTO from './dto/create-event.dto';
import UpdateEventDTO from './dto/update-event.dto';
import { EventsService } from './event.service';
import { IsEventOwner } from './guards/is-event-owner.guard';

@ApiTags('events')
@ApiBearerAuth()
@Controller('/events')
export class EventsController {
  constructor(private eventService: EventsService) {}

  @Get()
  async findAll() {
    return await this.eventService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.eventService.findOne(id);
  }

  @Post()
  async create(@Request() req, @Body() data: CreateEventDTO) {
    return await this.eventService.create(req.user.id, data);
  }

  @UseGuards(IsEventOwner)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() data: UpdateEventDTO) {
    return await this.eventService.update(id, data);
  }

  @UseGuards(IsEventOwner)
  @Delete(':id')
  async delete(@Param('id') id: string) {
    const isDeleted = await this.eventService.delete(id);

    if (!isDeleted) {
      throw new NotFoundException('No event was found with given id');
    }
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, EventDto, UpdateEventDto } from './dto';
import { EventExistsInterceptor } from './interceptor/event-exists.interceptor';
import { FileUploadInterceptor } from './interceptor/file-upload.interceptor';
import { FileUploaded } from './decorator';
import { JwtGuard } from '../auth/guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateEventFormDto } from './dto/create-event-form.dto';
import { UpdateEventFormDto } from './dto/update-event-form.dto';
import { Response } from 'express';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({ type: EventDto })
  @ApiOperation({ summary: 'creates a new event' })
  @ApiConsumes('multipart/form-data')
  @Post('/')
  @CreateEventFormDto()
  @UseInterceptors(FileUploadInterceptor(['jpg', 'jpeg', 'png']))
  create(@Body() createEventDto: CreateEventDto, @FileUploaded(['png', 'jpg', 'jpeg']) files: Express.Multer.File[]) {
    return this.eventService.create(createEventDto, files);
  }

  @ApiOperation({ summary: 'lists all registered events' })
  @ApiOkResponse({ type: EventDto, isArray: true })
  @Get('/')
  async findAll() {
    return this.eventService.findAll();
  }

  @ApiOperation({ summary: 'finds a registered event by id' })
  @Get(':id')
  @UseInterceptors(EventExistsInterceptor)
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @ApiOperation({ summary: 'updates all given fields of event' })
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @UpdateEventFormDto()
  @UseInterceptors(EventExistsInterceptor, FileUploadInterceptor(['jpeg', 'jpg', 'png']))
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @FileUploaded(['jpg', 'png', 'jpeg']) files: Express.Multer.File[],
  ) {
    return this.eventService.update(+id, updateEventDto, files);
  }

  @ApiNoContentResponse({ status: 204 })
  @ApiOperation({ summary: 'deletes an event by given id' })
  @Delete(':id')
  @UseInterceptors(EventExistsInterceptor)
  async remove(@Param('id') id: string, @Res() res: Response) {
    await this.eventService.remove(+id);
    return res.status(HttpStatus.NO_CONTENT).json([]);
  }
}

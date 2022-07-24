import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UseGuards } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto, EventDto, UpdateEventDto } from './dto';
import { EventExistsInterceptor } from './interceptor/event-exists.interceptor';
import { FileUploadInterceptor } from './interceptor/file-upload.interceptor';
import { FileUploaded } from './decorator';
import { JwtGuard } from '../auth/guard';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOkResponse, ApiProduces, ApiTags } from '@nestjs/swagger';
import { CreateEventFormDto } from './dto/create-event-form.dto';
import { UpdateEventFormDto } from './dto/update-event-form.dto';

@ApiTags('events')
@ApiBearerAuth()
@UseGuards(JwtGuard)
@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOkResponse({
    type: EventDto,
  })
  @ApiConsumes('multipart/form-data')
  @CreateEventFormDto()
  @Post('/')
  @UseInterceptors(FileUploadInterceptor(['jpg', 'jpeg', 'png']))
  create(@Body() createEventDto: CreateEventDto, @FileUploaded(['png', 'jpg', 'jpeg']) files: Express.Multer.File[]) {
    return this.eventService.create(createEventDto, files);
  }

  @Get('/')
  @ApiOkResponse({
    type: EventDto,
    isArray: true,
  })
  async findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  @UseInterceptors(EventExistsInterceptor)
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Patch(':id')
  @ApiConsumes('multipart/form-data')
  @UpdateEventFormDto()
  @UseInterceptors(EventExistsInterceptor, FileUploadInterceptor(['jpeg', 'jpg', 'png']))
  update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
    @FileUploaded(['jpg', 'png', 'jpeg']) files: Express.Multer.File[],
  ) {
    return this.eventService.update(+id, updateEventDto, files);
  }

  @Delete(':id')
  @UseInterceptors(EventExistsInterceptor)
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }
}

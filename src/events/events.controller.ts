import { ValidateIsOwnerGuard } from './guards/validate-is-owner.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from './../auth/decorators/current-user.decorator';
import { User } from './../users/entities/user.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventsService } from './events.service';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { EventCloudinaryService } from './services/events-cloudinary-upload.service';
import { uploadConfig } from './helpers/upload-config';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { FilesUploadDto } from './dto/file-upload.dto';
import { EventSwaggerPost, EventSwaggerList } from './swagger/event.swagger';
import {
  BadRequestSwaggerUnauthorized,
  BadRequestSwaggerConflict,
  BadRequestSwaggerNotFound,
  BadRequestSwaggerForbiddenAccess,
} from './swagger/bad-request.swagger';

@Controller('events')
@ApiTags('events')
@ApiBearerAuth()
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventCloudinaryService: EventCloudinaryService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new event' })
  @ApiResponse({
    status: 201,
    type: EventSwaggerPost,
    description: 'Create an event',
  })
  @ApiResponse({
    status: 401,
    type: BadRequestSwaggerUnauthorized,
    description: 'This route requires authorization to access.',
  })
  @ApiResponse({
    status: 409,
    type: BadRequestSwaggerConflict,
    description:
      'Error creating an event scheduled at this location on this date',
  })
  create(@Body() createEventDto: CreateEventDto, @CurrentUser() user: User) {
    return this.eventsService.create(createEventDto, user);
  }

  @Post(':id/images')
  @ApiCreatedResponse({ description: 'Create an event' })
  @ApiOperation({ summary: 'Add new images to an event' })
  @UseInterceptors(AnyFilesInterceptor(uploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FilesUploadDto,
  })
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() response: { data: string },
  ) {
    const eventImagesDTO =
      await this.eventCloudinaryService.uploadImageToCloudinary(files, id);

    let deleteEventImagesId = [];
    if (response.data) {
      deleteEventImagesId = JSON.parse(response.data).imagesToDelete;
    }

    return this.eventsService.updateEventImage(
      eventImagesDTO,
      deleteEventImagesId,
      +id,
    );
  }

  @Get()
  @ApiResponse({
    status: 200,
    type: EventSwaggerList,
    description: 'List all events',
    isArray: true,
  })
  @ApiResponse({
    status: 401,
    type: BadRequestSwaggerUnauthorized,
    description: 'This route requires authorization to access.',
  })
  @ApiOperation({ summary: 'List all events' })
  findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: EventSwaggerList,
    description: 'List an event',
  })
  @ApiResponse({
    status: 401,
    type: BadRequestSwaggerUnauthorized,
    description: 'This route requires authorization to access.',
  })
  @ApiOperation({ summary: 'Get data event' })
  findOne(@Param('id') id: string) {
    return this.eventsService.findOneById(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    type: EventSwaggerList,
    description: 'Event updated successfully.',
  })
  @ApiResponse({
    status: 401,
    type: BadRequestSwaggerUnauthorized,
    description: 'This route requires authorization to access.',
  })
  @ApiResponse({
    status: 403,
    type: BadRequestSwaggerForbiddenAccess,
    description: 'This user is not allowed.',
  })
  @ApiResponse({
    status: 404,
    type: BadRequestSwaggerNotFound,
    description: 'Event not found.',
  })
  @UseGuards(ValidateIsOwnerGuard)
  @ApiOperation({ summary: 'Update event data' })
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventsService.update(+id, updateEventDto);
  }

  @Delete(':id')
  @UseGuards(ValidateIsOwnerGuard)
  @HttpCode(204)
  @ApiResponse({
    status: 204,
    description: 'Deleted successfully',
  })
  @ApiResponse({
    status: 401,
    type: BadRequestSwaggerUnauthorized,
    description: 'This route requires authorization to access.',
  })
  @ApiResponse({
    status: 403,
    type: BadRequestSwaggerForbiddenAccess,
    description: 'This user is not allowed.',
  })
  @ApiResponse({
    status: 404,
    type: BadRequestSwaggerNotFound,
    description: 'Event not found.',
  })
  @ApiOperation({ summary: 'Remove an event' })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}

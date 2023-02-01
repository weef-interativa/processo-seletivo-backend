import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UploadedFiles, UseInterceptors } from '@nestjs/common/decorators';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CurrentUser } from './../auth/decorators/current-user.decorator';
import { User } from './../users/entities/user.entity';
import { CreateEventsImages } from './dto/create-event-images.dto';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateImagesDTO } from './dto/update-images.dto';
import { ValidateIsOwnerGuard } from './guards/validate-is-owner.guard';
import { uploadConfig } from './helpers/upload-config';
import { EventQueryDTO, IEventQuery } from './models/event-query';
import { EventCloudinaryService } from './services/events-cloudinary-upload.service';
import { EventsImageService } from './services/events-images.service';
import { EventsService } from './services/events.service';
import {
  BadRequestSwaggerConflict,
  BadRequestSwaggerForbiddenAccess,
  BadRequestSwaggerNotFound,
  BadRequestSwaggerUnauthorized,
} from './swagger/bad-request.swagger';
import { EventSwaggerList, EventSwaggerPost } from './swagger/event.swagger';

@Controller('events')
@ApiTags('events')
@ApiBearerAuth()
export class EventsController {
  constructor(
    private readonly eventsService: EventsService,
    private readonly eventsImageService: EventsImageService,
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
  @UseGuards(ValidateIsOwnerGuard)
  @ApiCreatedResponse({ description: 'Add images to an event' })
  @ApiOperation({ summary: 'Add images to an event' })
  @UseInterceptors(AnyFilesInterceptor(uploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: CreateEventsImages,
  })
  async addFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
  ) {
    const eventImagesDTO =
      await this.eventCloudinaryService.uploadImageToCloudinary(files, id);

    return this.eventsImageService.create(eventImagesDTO, +id);
  }

  @Patch(':id/images')
  @UseGuards(ValidateIsOwnerGuard)
  @ApiCreatedResponse({ description: 'Update images from an event' })
  @ApiOperation({ summary: 'Update (add and delete) images from an event' })
  @UseInterceptors(AnyFilesInterceptor(uploadConfig))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UpdateImagesDTO,
  })
  async uploadFile(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Param('id') id: string,
    @Body() response: { data: string },
  ) {
    let deleteEventImagesId = [];

    if (response.data) {
      deleteEventImagesId = JSON.parse(response.data).imagesToDelete;
    }

    const eventImagesDTO =
      await this.eventCloudinaryService.uploadImageToCloudinary(files, id);

    return this.eventsImageService.updateEventImage(
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
  @ApiQuery({
    type: EventQueryDTO,
  })
  findAll(@Query() query: IEventQuery) {
    return this.eventsService.findAll(query);
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
  @ApiResponse({
    status: 404,
    type: BadRequestSwaggerNotFound,
    description: 'Event not found.',
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
  @ApiOperation({
    summary:
      'Remove an event. Delete all images from the event, and the address also is deleted in the database if not being used in another event.',
  })
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}

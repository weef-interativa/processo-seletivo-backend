import { ForbiddenException, Injectable } from '@nestjs/common';
import { Event, Image } from '@prisma/client';
import { DatabaseService } from '../database/database.service';
import { CreateEventDto, UpdateEventDto } from './dto';
import * as fs from 'fs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class EventService {
  constructor(private database: DatabaseService) {}

  async create(createEventDto: CreateEventDto, files: Express.Multer.File[]) {
    try {
      const event = await this.database.event.create({ data: createEventDto });
      await this.createImagesRegisters(event, files);
      return event;
    } catch (err) {
      if (err instanceof PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
          throw new ForbiddenException('event already exists');
        }
      }
      throw err;
    }
  }

  findAll() {
    return this.database.event.findMany({
      include: { images: true },
    });
  }

  async findOne(id: number) {
    const event = await this.database.event.findUnique({ where: { id }, include: { images: true } });

    return event;
  }

  async update(id: number, updateEventDto: UpdateEventDto, files: Express.Multer.File[]) {
    const event = await this.database.event.update({ where: { id: id }, data: updateEventDto });
    const images = await this.database.image.findMany({ where: { eventId: event.id } });
    images.map((image) => this.deleteImage(image));
    this.createImagesRegisters(event, files);

    return event;
  }

  async remove(id: number) {
    const images = await this.database.image.findMany({ where: { eventId: id } });
    images.map((image) => this.deleteImage(image));
    return await this.database.event.delete({ where: { id } });
  }

  private async createImagesRegisters(event: Event, files: Express.Multer.File[]) {
    const fs = files.map(async (file) =>
      this.database.image.create({
        data: { name: file.filename, path: file.destination, eventId: event.id },
      }),
    );
    return Promise.all(fs);
  }

  private async deleteImage(image: Image) {
    const filePath = `${__dirname}/../../uploads/${image.name}`;
    await this.database.image.delete({ where: { id: image.id } });
    await fs.promises.unlink(filePath);
  }
}

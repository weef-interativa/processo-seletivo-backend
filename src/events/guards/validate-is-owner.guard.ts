import { HttpStatus } from '@nestjs/common/enums';
import { HttpException } from '@nestjs/common/exceptions';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';

@Injectable()
export class ValidateIsOwnerGuard extends AuthGuard('jwt') {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
  ) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const userId = context.switchToHttp().getRequest().user.id;
    const eventId = context.switchToHttp().getRequest().params.id;

    const actualEvent = await this.eventRepository.findOne({
      where: {
        id: eventId,
      },
    });

    if (!actualEvent) {
      throw new HttpException(
        'This event does not exist.',
        HttpStatus.NOT_FOUND,
      );
    }

    const isOwner = actualEvent.userId === userId;

    if (!isOwner) {
      throw new HttpException(
        'This user is not allowed.',
        HttpStatus.FORBIDDEN,
      );
    }
    return true;
  }
}

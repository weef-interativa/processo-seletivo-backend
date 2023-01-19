import { CanActivate, Injectable, ExecutionContext } from '@nestjs/common';
import { EventsService } from '../event.service';

@Injectable()
export class IsEventOwner implements CanActivate {
  constructor(private eventService: EventsService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.id;
    const eventId = request.params.id;

    const event = await this.eventService.findOne(eventId);
    const owner = await event.responsible;

    return owner.id === userId;
  }
}

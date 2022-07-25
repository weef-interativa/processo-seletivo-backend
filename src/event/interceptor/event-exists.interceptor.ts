import { CallHandler, ExecutionContext, ForbiddenException, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DatabaseService } from '../../database/database.service';

/**
 * this interceptor can only be used on routes with id param
 */
@Injectable()
export class EventExistsInterceptor implements NestInterceptor {
  constructor(private database: DatabaseService) {}

  async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<{ params: { id: string } }>();
    const eventId = parseInt(req.params.id);
    const event = await this.database.event.findFirst({ where: { id: eventId } });
    if (event === null) {
      throw new ForbiddenException('event not exists');
    }

    return next.handle();
  }
}

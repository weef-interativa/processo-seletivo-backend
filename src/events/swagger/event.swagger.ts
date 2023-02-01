import { OmitType } from '@nestjs/swagger';
import { Event } from '../entities/event.entity';

export class EventSwaggerPost extends OmitType(Event, ['images']) {}

export class EventSwaggerList extends Event {}

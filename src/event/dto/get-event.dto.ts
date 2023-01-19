import GetMeDTO from 'src/auth/dto/get-me.dto';
import Event from '../entities/event.entity';
import EventImageDTO from './create-event-image.dto';

export default class GetEventDTO {
  constructor(event: Partial<Event>) {
    this.id = event.id;
    this.eventDate = event.eventDate;
    this.name = event.name;
    this.city = event.city;
    this.state = event.state;
    this.address = event.address;
    this.complement = event.complement;
    this.email = event.email;
    this.phone = event.phone;
    this.images = event.images;
    this.responsible = {
      id: event.responsible.id,
      username: event.responsible.username,
    };
  }

  id: string;

  eventDate: Date;

  name: string;

  city: string;

  state: string;

  address: string;

  complement: string;

  email: string;

  phone: string;

  images: EventImageDTO[];

  responsible: GetMeDTO;
}

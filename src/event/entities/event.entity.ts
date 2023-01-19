import User from '../../user/user.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import EventImage from './event-image.entity';

@Entity('events')
export default class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  eventDate: Date;

  @Column()
  name: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address: string;

  @Column()
  complement: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => EventImage, (eventImage) => eventImage.event, {
    eager: true,
    cascade: true,
  })
  images: EventImage[];

  @ManyToOne(() => User, (user) => user.events, { eager: true })
  responsible: User;

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor(event: Partial<Event>) {
    this.id = event?.id;

    this.eventDate = event?.eventDate;

    this.name = event?.name;

    this.city = event?.city;

    this.state = event?.state;

    this.address = event?.address;

    this.complement = event?.complement;

    this.email = event?.email;

    this.phone = event?.phone;

    this.images = event?.images;

    this.responsible = event?.responsible;

    this.updatedAt = event?.updatedAt;

    this.createdAt = event?.createdAt;
  }
}

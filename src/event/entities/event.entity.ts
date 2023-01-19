import User from 'src/user/user.entity';
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
}

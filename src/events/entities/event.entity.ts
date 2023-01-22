import { User } from './../../users/entities/user.entity';
import { EventAddress } from './event_address.entity';
import { EventImage } from './event_image.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'user_id' })
  userId: number;

  @Column({ name: 'event_address_id' })
  eventAddressId: number;

  @Column()
  name: string;

  @Column({ name: 'event_date' })
  eventDate: Date;

  @Column()
  responsible: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => EventImage, (event_image) => event_image.event)
  images: EventImage[];

  @ManyToOne(() => EventAddress, (event_address) => event_address.events)
  @JoinColumn({ name: 'event_address_id', referencedColumnName: 'id' })
  address: EventAddress;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

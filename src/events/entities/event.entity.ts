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
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'events' })
export class Event {
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ name: 'user_id' })
  userId: number;

  @ApiProperty()
  @Column({ name: 'event_address_id' })
  eventAddressId: number;

  @ApiProperty()
  @Column()
  name: string;

  @ApiProperty()
  @Column({ name: 'event_date' })
  eventDate: Date;

  @ApiProperty()
  @Column()
  responsible: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  phone: string;

  @OneToMany(() => EventImage, (event_image) => event_image.event)
  @ApiProperty({ type: () => EventImage, isArray: true })
  images: EventImage[];

  @ManyToOne(() => EventAddress, (event_address) => event_address.events)
  @JoinColumn({ name: 'event_address_id', referencedColumnName: 'id' })
  @ApiProperty({ type: () => EventAddress })
  address: EventAddress;

  @ManyToOne(() => User, (user) => user.events)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'event_address' })
export class EventAddress {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Event, (event) => event.address)
  events: Event[];

  @Column({ name: 'zip_code' })
  zipCode: string;

  @Column()
  state: string;

  @Column()
  city: string;

  @Column()
  street: string;

  @Column()
  number: number;

  @Column({ nullable: true })
  complement: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

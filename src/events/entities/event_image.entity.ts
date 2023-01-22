import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'event_images' })
export class EventImage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ name: 'asset_id' })
  assetId: string;

  @Column({ name: 'event_id' })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.images)
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: Event;

  @Column({ name: 'file_name' })
  fileName: string;

  @Column()
  url: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

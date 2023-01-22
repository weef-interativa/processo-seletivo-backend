import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty()
  @Column({ name: 'asset_id' })
  assetId: string;

  @ApiProperty()
  @Column({ name: 'event_id' })
  eventId: number;

  @ManyToOne(() => Event, (event) => event.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'event_id', referencedColumnName: 'id' })
  event: Event;

  @ApiProperty()
  @Column({ name: 'file_name' })
  fileName: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

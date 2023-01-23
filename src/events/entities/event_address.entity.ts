import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
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
  @ApiProperty()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToMany(() => Event, (event) => event.address, {
    onDelete: 'CASCADE',
  })
  events: Event[];

  @ApiProperty()
  @Column({ name: 'zip_code' })
  zipCode: string;

  @ApiProperty()
  @Column()
  state: string;

  @ApiProperty()
  @Column()
  city: string;

  @ApiProperty()
  @Column()
  street: string;

  @ApiProperty()
  @Column()
  number: number;

  @ApiPropertyOptional()
  @Column({ nullable: true })
  complement: string;

  @ApiProperty()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

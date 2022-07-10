import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'date'})
  eventDate: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  eventName: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  owner: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  city: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  state: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  address: string;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  adjunct: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'bigint' })
  phone: string;

  @Column({ nullable: true, type: 'text' })
  images: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

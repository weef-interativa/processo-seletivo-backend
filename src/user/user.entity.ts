import Event from '../event/entities/event.entity';
import {
  Column,
  Entity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    unique: true,
  })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Event, (event) => event.responsible)
  events: Event[];

  @UpdateDateColumn()
  updatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  constructor(user: Partial<User>) {
    this.id = user?.id;

    this.username = user?.username;

    this.password = user?.password;

    this.events = user?.events;

    this.updatedAt = user?.updatedAt;

    this.createdAt = user?.createdAt;
  }
}

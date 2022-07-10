import { Exclude, instanceToPlain } from "class-transformer";
import { Event } from "src/events/entities/event.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 200 })
    name: string;

    @Column({ nullable: false })
		@Exclude({ toPlainOnly: true })
    password: string;

    @OneToMany(() => Event, event => event.responsable)
    events: Event[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

		toJSON() {
			return instanceToPlain(this);
		}
}

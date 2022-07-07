import User from "src/modules/users/entities/users.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import EventImages from "../../event-images/entities/event-images.entity";

@Entity()
class Events {

  @PrimaryGeneratedColumn({type: 'integer'})
  public id: number;

  @Column({type: 'varchar', length: 140, nullable: false})
  public name: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_responsible' })
  user: User;

  @Column({nullable: false})
  id_responsible: number;

  @Column({type:'varchar', length: 18, nullable: false})
  public city: string;

  @Column({type: 'varchar', length: 20, nullable: false})
  public state: string;

  @Column({type:'varchar', length: 250, nullable: false})
  public address: string;

  @Column({type: 'varchar', nullable: true})
  public address_complement: string;

  @Column({type: 'timestamp', nullable: false})
  public date: string;

  @Column({type: 'varchar', length:255, nullable: false})
  public email: string;

  @Column({type: 'varchar', length:255, nullable: false})
  public phone_number: string;

  @OneToMany(()=>EventImages, event_image => event_image.event, {nullable: true})
  public images?: EventImages[];
}

export default Events;
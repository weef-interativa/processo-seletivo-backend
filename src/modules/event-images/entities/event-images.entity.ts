import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Events from '../../events/entities/events.entity';
 
@Entity()
class EventImages {
  @PrimaryGeneratedColumn()
  public id: number;
 
  @Column()
  filename: string;
 
  @Column({
    type: 'bytea',
  })
  data: Uint8Array;

  @ManyToOne(() => Events, event => event.images)
  @JoinColumn({ name: 'event_id'})
  public event: Events;

  @Column()
  event_id: number;
}
 
export default EventImages;
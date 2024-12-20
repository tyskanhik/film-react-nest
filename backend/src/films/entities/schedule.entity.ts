import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Film } from './film.entity';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', nullable: true })
  daytime: string;

  @Column({ type: 'int', nullable: true })
  hall: number;

  @Column({ type: 'int', nullable: true })
  rows: number;

  @Column({ type: 'int', nullable: true })
  seats: number;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @Column('text', { array: true, nullable: true })
  taken: string;

  @ManyToOne(() => Film, (film) => film.schedule)
  film: Film;
}

import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tickets')
export class TicketEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  film: string;

  @Column({ type: 'varchar', length: 255 })
  session: string;

  @Column({ type: 'date' })
  daytime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  day?: string;

  @Column({ type: 'time', nullable: true })
  time?: string;

  @Column({ type: 'int' })
  row: number;

  @Column({ type: 'int' })
  seat: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  price: number;
}

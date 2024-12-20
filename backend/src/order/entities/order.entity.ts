import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { TicketEntity } from './ticket.entity';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 20 })
  phone: string;

  @OneToMany(() => TicketEntity, (ticket) => ticket.id, { cascade: true })
  tickets: TicketEntity[];
}

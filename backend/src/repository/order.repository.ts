import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderEntity } from '../order/entities/order.entity';
import { OrderDTO, TicketDTO } from 'src/order/dto/order.dto';

@Injectable()
export class OrderRepository {
  constructor(
    @InjectRepository(OrderEntity)
    private orderRepository: Repository<OrderEntity>,
  ) {}

  private generateTicketsWithId(tickets: TicketDTO[]) {
    return tickets.map((ticket) => ({
      ...ticket,
      id: crypto.randomUUID(),
    }));
  }

  async createOrder(orderData: Partial<OrderDTO>) {
    const newTickets = this.generateTicketsWithId(orderData.tickets);

    const newOrder = new OrderDTO();
    newOrder.email = orderData.email;
    newOrder.phone = orderData.phone;
    newOrder.id = crypto.randomUUID();
    newOrder.tickets = newTickets;

    return newOrder;
  }
}

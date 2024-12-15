import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderDTO, TicketDTO } from './dto/order.dto';
import { FilmRepository } from 'src/repository/films.repository';
import { OrderRepository } from 'src/repository/order.repository';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(orderDto: OrderDTO) {
    const tickets = orderDto.tickets;
    let number = 0;
    for (const ticket of tickets) {
      number = await this.validateTickets(ticket);
    }
    await this.orderRepository.createOrder(orderDto);
    return { total: number, items: tickets };
  }

  private async validateTickets(ticket: TicketDTO): Promise<number> {
    const film = await this.filmRepository.findOne(ticket.film);
    if (!film) {
      throw new NotFoundException(`Film not found for ID ${ticket.film}`);
    }

    const schedule = film.schedule.find((s) => s.id === ticket.session);
    if (!schedule) {
      throw new NotFoundException(
        `Invalid session for ticket ${JSON.stringify(ticket)}`,
      );
    }

    const seatKey = `${ticket.row}:${ticket.seat}`;
    if (schedule.taken.includes(seatKey)) {
      throw new NotFoundException(
        `Seat ${seatKey} is already taken for session ${ticket.session}`,
      );
    }

    schedule.taken.push(seatKey);
    await this.filmRepository.updateFilmSchedule(film.id, film.schedule);

    return schedule.taken.length;
  }
}

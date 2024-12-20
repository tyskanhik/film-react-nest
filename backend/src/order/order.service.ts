import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmRepository } from '../repository/films.repository';
import { OrderRepository } from '../repository/order.repository';
import { Film } from '../films/entities/film.entity';
import { OrderDTO, TicketDTO } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly filmRepository: FilmRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  async createOrder(orderDto: OrderDTO) {
    const tickets = orderDto.tickets;
    let total: number;
    for (const ticket of tickets) {
      total = await this.validateTickets(ticket);
    }

    const createdOrder = await this.orderRepository.createOrder(orderDto);

    return {
      total: total,
      items: createdOrder.tickets,
    };
  }

  private async validateTickets(ticket: TicketDTO) {
    const film: Film = await this.filmRepository.findOne(ticket.film);
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
    if (schedule.taken.split(',').includes(seatKey)) {
      throw new NotFoundException(
        `Seat ${seatKey} is already taken for session ${ticket.session}`,
      );
    }

    if (!schedule.taken) {
      schedule.taken = seatKey;
    } else {
      schedule.taken = `${schedule.taken},${seatKey}`;
    }

    const countTakenSeats = (taken: string): number => {
      if (!taken) {
        return 0;
      }
      const seatsArray = taken.split(',');

      return seatsArray.length;
    };

    const numberOfTakenSeats = countTakenSeats(schedule.taken);

    await this.filmRepository.updateFilmSchedule(film.schedule);
    return numberOfTakenSeats;
  }
}

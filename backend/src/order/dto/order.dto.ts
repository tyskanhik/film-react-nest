export class TicketDTO {
  film: string;
  session: string;
  daytime: string;
  day: string;
  time: string;
  row: number;
  seat: number;
  price: number;
}

export class OrderDTO {
  tickets: TicketDTO[];
  email: string;
  phone: string;
}

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  film: string;

  @Prop({ required: true })
  session: string;

  @Prop({ required: true })
  daytime: string;

  @Prop({ required: true })
  day: string;

  @Prop({ required: true })
  time: string;

  @Prop({ required: true })
  row: number;

  @Prop({ required: true })
  seat: number;

  @Prop({ required: true })
  price: number;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ type: [TicketSchema] })
  tickets: Ticket[];

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);

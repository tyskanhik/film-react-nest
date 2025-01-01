import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../films/entities/film.entity';
import { Schedule } from '../films/entities/schedule.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import { TicketEntity } from 'src/order/entities/ticket.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_DRIVER === 'postgres' ? 'postgres' : 'mongodb',
      host: process.env.DATABASE_URL,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Film, Schedule],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([Film, Schedule, OrderEntity, TicketEntity]),
  ],
})
export class DatabaseModule {}
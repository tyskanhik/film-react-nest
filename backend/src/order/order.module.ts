import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { OrderRepository } from '../repository/order.repository';
import { FilmsModule } from '../films/films.module';
import { TicketEntity } from './entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, TicketEntity]), FilmsModule],
  controllers: [OrderController],
  providers: [OrderService, OrderRepository],
  exports: [OrderRepository],
})
export class OrderModule {}

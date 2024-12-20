import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async createOrder(@Body() orderDto: OrderDTO) {
    try {
      const createdOrder = await this.orderService.createOrder(orderDto);
      return createdOrder;
    } catch (error) {
      throw new InternalServerErrorException('Failed to create order');
    }
  }
}

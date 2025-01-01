import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDTO } from './dto/order.dto';

describe('OrderController', () => {
  let orderController: OrderController;
  let orderService: OrderService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        createOrder: jest.fn(),
      })
      .compile();

    orderController = moduleRef.get<OrderController>(OrderController);
    orderService = moduleRef.get<OrderService>(OrderService);
  });

  it('.createOrder() should call createOrder method of the service', async () => {
    const orderDto: OrderDTO = {
      email: 'test@ya.ru',
      phone: '+70000000000',
      tickets: [
        {
          film: '1',
          session: '2',
          daytime: '2024-12-27T12:00:00+03:00',
          row: 1,
          seat: 1,
          price: 1000,
          day: '2024-12-27',
          time: '12:00',
        },
      ],
    };

    await orderController.createOrder(orderDto);

    expect(orderService.createOrder).toHaveBeenCalledWith(orderDto);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [OrderService],
    })
      .overrideProvider(OrderService)
      .useValue({
        processOrder: jest.fn(),
      })
      .compile();

    controller = module.get<OrderController>(OrderController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('testing process order', () => {
    it('should process order successfully', async () => {
      const ticket = {
        film: '1',
        session: '1',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 2,
        price: 100,
      };

      const order: CreateOrderDto = {
        email: 'example@mail.ru',
        phone: '8900000000',
        tickets: [ticket],
      };

      const mockResponse: OrderResponseDto = {
        total: 1,
        items: [ticket],
      };

      (service.processOrder as jest.Mock).mockResolvedValue(mockResponse);

      const result = controller.order(order);

      expect(result).toEqual(mockResponse);
      expect(service.processOrder).toHaveBeenCalledTimes(1);
      expect(service.processOrder).toHaveBeenCalledWith(order);
    });
  });

  it('should process several tickets correctly', async () => {
    const tickets = [
      {
        film: '1',
        session: '1',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 1,
        seat: 2,
        price: 100,
      },
      {
        film: '34',
        session: '7',
        daytime: '2024-06-28T10:00:53+03:00',
        row: 6,
        seat: 8,
        price: 300,
      },
    ];

    const order: CreateOrderDto = {
      email: 'example@mail.ru',
      phone: '8900000000',
      tickets,
    };

    const mockResponse: OrderResponseDto = {
      total: 1,
      items: tickets,
    };

    (service.processOrder as jest.Mock).mockResolvedValue(mockResponse);

    const result = controller.order(order);

    expect(result).toEqual(mockResponse);
    expect(service.processOrder).toHaveBeenCalledTimes(1);
    expect(service.processOrder).toHaveBeenCalledWith(order);
  });
});

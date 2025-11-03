import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto, OrderResponseDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async order(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<OrderResponseDto> {
    return await this.orderService.processOrder(createOrderDto);
  }
}

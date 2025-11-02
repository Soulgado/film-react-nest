import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async order(@Body() createOrderDto: CreateOrderDto) {
    try {
      const result = await this.orderService.processOrder(createOrderDto);
      return { message: result };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

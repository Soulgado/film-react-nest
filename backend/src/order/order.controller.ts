import { Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/order.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async order(@Body() createOrderDto: CreateOrderDto) {
    const film = await this.orderService.getFilmById(createOrderDto.film.id);
    const session = film.schedule.find(
      (s) => s.id === createOrderDto.session.id,
    );
    if (
      session.taken.some(
        (seat) => seat === `${createOrderDto.row}:${createOrderDto.seat}`,
      )
    ) {
      return 'Seat has already been taken';
    } else {
      session.taken.push(`${createOrderDto.row}:${createOrderDto.seat}`);
      this.orderService.saveFilmData(film);
    }
    return 'Success';
  }
}

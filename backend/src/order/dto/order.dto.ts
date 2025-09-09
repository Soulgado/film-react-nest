//TODO реализовать DTO для /orders
import { GetFilmsDto, ScheduleDto } from 'src/films/dto/films.dto';

export class CreateOrderDto {
  film: GetFilmsDto;
  session: ScheduleDto;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

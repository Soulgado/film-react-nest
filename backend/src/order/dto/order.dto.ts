//TODO реализовать DTO для /orders
import { GetFilmDto, ScheduleDto } from 'src/films/dto/films.dto';

export class CreateOrderDto {
  film: GetFilmDto;
  session: ScheduleDto;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

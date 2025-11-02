import { Injectable, ConflictException } from '@nestjs/common';
import { GetFilmDto } from 'src/films/dto/films.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { CreateOrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private filmRepository: FilmsMongoDbRepository) {}

  public async getFilmById(id: string) {
    return this.filmRepository.getFilmById(id);
  }

  public async saveFilmData(film: GetFilmDto) {
    this.filmRepository.save(film);
  }

  public async processOrder(createOrderDto: CreateOrderDto) {
    const film = await this.getFilmById(createOrderDto.film.id);
    const session = film.schedule.find(
      (s) => s.id === createOrderDto.session.id,
    );

    if (!session) {
      throw new Error('Session not found');
    }

    const seatIdentifier = `${createOrderDto.row}:${createOrderDto.seat}`;

    if (session.taken.some((seat) => seat === seatIdentifier)) {
      throw new ConflictException('Seat has already been taken');
    }

    session.taken.push(seatIdentifier);
    await this.saveFilmData(film);

    return 'Success';
  }
}

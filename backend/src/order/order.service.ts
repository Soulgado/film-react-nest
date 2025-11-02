import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { GetFilmDto } from 'src/films/dto/films.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { CreateOrderDto, TicketDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private filmRepository: FilmsMongoDbRepository) {}

  public async getFilmById(id: string) {
    const film = await this.filmRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }

  public async saveFilmData(film: GetFilmDto) {
    this.filmRepository.save(film);
  }

  public async processOrder(createOrderDto: CreateOrderDto) {
    const processedTickets: TicketDto[] = [];

    for (const ticket of createOrderDto.tickets) {
      const processedTicket = await this.processTicket(ticket);
      processedTickets.push(processedTicket);
    }

    return {
      total: processedTickets.length,
      items: processedTickets,
    };
  }

  private async processTicket(ticket: TicketDto): Promise<TicketDto> {
    const film = await this.filmRepository.getFilmById(ticket.film);

    if (!film) {
      throw new NotFoundException('Film is not found');
    }

    const session = film.schedule.find((s) => s.id === ticket.session);
    if (!session) {
      throw new NotFoundException('Session is not found');
    }

    const seatIdentifier = `${ticket.row}:${ticket.seat}`;
    if (session.taken.includes(seatIdentifier)) {
      throw new BadRequestException(
        `Seat ${seatIdentifier} has already been taken`,
      );
    }

    session.taken.push(seatIdentifier);
    await this.filmRepository.save(film);

    return {
      film: ticket.film,
      session: ticket.session,
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    };
  }
}

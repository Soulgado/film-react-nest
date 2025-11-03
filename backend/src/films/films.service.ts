import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsMongoDbRepository) {}

  public async getFilms(): Promise<FilmsResponseDto> {
    const films = await this.filmsRepository.getFilms();

    return {
      total: films.length,
      items: films,
    };
  }

  public async getFilmsSchedule(id: string): Promise<ScheduleResponseDto> {
    const film = await this.filmsRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException('Film is not found');
    }

    return {
      total: film.schedule?.length || 0,
      items: film.schedule || [],
    };
  }

  public async getFilmById(id: string) {
    const film = await this.filmsRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsMongoDbRepository) {}

  public async getFilms() {
    return this.filmsRepository.getFilms();
  }

  public async getFilmById(id: string) {
    const film = await this.filmsRepository.getFilmById(id);
    if (!film) {
      throw new NotFoundException('Film not found');
    }
    return film;
  }
}

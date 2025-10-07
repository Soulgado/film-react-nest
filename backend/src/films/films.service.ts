import { Injectable } from '@nestjs/common';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(private filmsRepository: FilmsMongoDbRepository) {}

  public async getFilms() {
    return this.filmsRepository.getFilms();
  }

  public async getFilmById(id: string) {
    return this.filmsRepository.getFilmById(id);
  }
}

import { Injectable } from '@nestjs/common';
import { GetFilmDto } from 'src/films/dto/films.dto';
import { FilmsMongoDbRepository } from 'src/repository/films.repository';

@Injectable()
export class OrderService {
  constructor(private filmRepository: FilmsMongoDbRepository) {}

  public async getFilmById(id: string) {
    return this.filmRepository.getFilmById(id);
  }

  public async saveFilmData(film: GetFilmDto) {
    this.filmRepository.save(film);
  }
}

import { InjectRepository } from '@nestjs/typeorm';
import { GetFilmDto } from 'src/films/dto/films.dto';
import { Film } from '../films/entities/film.entity';
import { Repository } from 'typeorm';

export class FilmsDBRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
  ) {}

  private getFilmMapperFn(film): GetFilmDto {
    return {
      id: film._id,
      ...film,
    };
  }

  async getFilmById(id: string): Promise<GetFilmDto> {
    const item = await this.filmRepository.findOneBy({
      id: id,
    });
    return this.getFilmMapperFn(item);
  }

  async getFilms(): Promise<Omit<GetFilmDto, 'schedule'>[]> {
    const films = await this.filmRepository.find({ relations: ['schedule'] });
    return films.map((film) => this.getFilmMapperFn(film));
  }

  async save(film: GetFilmDto) {
    await this.filmRepository.update({ id: film.id }, film);
  }
}

import mongoose, { Schema, Mongoose } from 'mongoose';
import { GetFilmDto } from 'src/films/dto/films.dto';

const ScheduleSchema = new Schema({
  daytime: {
    type: String,
    required: true,
  },
  hall: {
    type: Number,
    required: true,
  },
  rows: {
    type: Number,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  taken: [
    {
      type: String,
    },
  ],
});

const FilmsSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  tags: [
    {
      type: String,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  about: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  schedule: {
    type: [ScheduleSchema],
    required: true,
  },
});

const Film = mongoose.model('Film', FilmsSchema);

export default Film;

export class FilmsMongoDbRepository {
  constructor(private connection: Mongoose) {}

  private getFilmMapperFn(film): GetFilmDto {
    return {
      id: film._id,
      ...film,
    };
  }

  async getFilmById(id: string): Promise<GetFilmDto> {
    const item = await Film.findById(id);
    return this.getFilmMapperFn(item);
  }

  async getFilms(): Promise<Omit<GetFilmDto, 'schedule'>[]> {
    const films = await Film.find({}).select({ schedule: 0 });
    return films.map((film) => this.getFilmMapperFn(film));
  }

  async save(film: GetFilmDto) {
    await Film.updateOne(film);
  }
}

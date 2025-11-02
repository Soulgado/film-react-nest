//TODO описать DTO для запросов к /films
export class GetFilmDto {
  id: string;
  rating: number;
  director: string;
  tags?: string[];
  image: string;
  cover: string;
  title: string;
  about: string;
  description: string;
  schedule?: [ScheduleDto];
}

export class ScheduleDto {
  id: string;
  daytime: string;
  hall: string;
  rows: number;
  seats: number;
  price: number;
  taken: string[];
}

export class FilmsResponseDto {
  total: number;
  items: GetFilmDto[];
}

export class ScheduleResponseDto {
  total: number;
  items: ScheduleDto[];
}

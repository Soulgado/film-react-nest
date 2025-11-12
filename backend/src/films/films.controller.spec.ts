import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { FilmsResponseDto, ScheduleResponseDto } from './dto/films.dto';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [FilmsService],
    })
      .overrideProvider(FilmsService)
      .useValue({
        getFilms: jest.fn(),
        getFilmsSchedule: jest.fn(),
      })
      .compile();

    controller = module.get<FilmsController>(FilmsController);
    service = module.get<FilmsService>(FilmsService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('testing getFilms', () => {
    it('should return corrent film data', async () => {
      const mockFilmsResponse: FilmsResponseDto = {
        total: 1,
        items: [
          {
            id: '0e33c7f6-27a7-4aa0-8e61-65d7e5effecf',
            rating: 2.9,
            director: 'Итан Райт',
            tags: ['Документальный'],
            image: '/bg1s.jpg',
            cover: '/bg1c.jpg',
            title: 'Архитекторы общества',
            about:
              'Документальный фильм, исследующий влияние искусственного интеллекта на общество и этические, философские и социальные последствия технологии.',
            description:
              'Документальный фильм Итана Райта исследует влияние технологий на современное общество, уделяя особое внимание роли искусственного интеллекта в формировании нашего будущего. Фильм исследует этические, философские и социальные последствия гонки технологий ИИ и поднимает вопрос: какой мир мы создаём для будущих поколений.',
          },
        ],
      };

      (service.getFilms as jest.Mock).mockResolvedValue(mockFilmsResponse);

      const result = await controller.getFilms();

      expect(result).toEqual(mockFilmsResponse);
      expect(service.getFilms).toHaveBeenCalledTimes(1);
      expect(service.getFilms).toHaveBeenCalledWith();
    });
  });

  describe('testing getSchedule', () => {
    it('should call service with correct film id', async () => {
      const filmId = '1';
      const mockResponse: ScheduleResponseDto = {
        items: [],
        total: 1,
      };

      (service.getFilmsSchedule as jest.Mock).mockResolvedValue(mockResponse);

      await controller.getSchedule(filmId);

      expect(service.getFilmsSchedule).toHaveBeenCalledWith(filmId);
    });

    it('should return schedule for correct film id', async () => {
      const filmId = '1';
      const mockResponse: ScheduleResponseDto = {
        total: 1,
        items: [
          {
            id: 'f2e429b0-685d-41f8-a8cd-1d8cb63b99ce',
            daytime: '2024-06-28T10:00:53+03:00',
            hall: '0',
            rows: 5,
            seats: 10,
            price: 350,
            taken: [],
          },
        ],
      };

      (service.getFilmsSchedule as jest.Mock).mockResolvedValue(mockResponse);

      const result = await controller.getSchedule(filmId);

      expect(result).toEqual(mockResponse);
      expect(service.getFilmsSchedule).toHaveBeenCalledTimes(1);
      expect(service.getFilmsSchedule).toHaveBeenCalledWith(filmId);
    });
  });
});

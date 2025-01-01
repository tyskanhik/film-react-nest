import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';

describe('FilmsController', () => {
  let filmsController: FilmsController;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let filmsService: FilmsService;

  const mockFilmsService = {
    getAllFilms: jest.fn(),
    getFilmById: jest.fn(),
    createFilm: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: mockFilmsService,
        },
      ],
    }).compile();

    filmsController = module.get<FilmsController>(FilmsController);
    filmsService = module.get<FilmsService>(FilmsService);
  });

  describe('findAll', () => {
    it('should return an array of films', async () => {
      const result: Film[] = [
        {
          id: '1',
          rating: 5,
          director: 'Director 1',
          tags: ['tag1', 'tag2'],
          image: 'image1',
          cover: 'cover1',
          title: 'Film 1',
          about: 'About 1',
          description: 'Description 1',
          schedule: [],
        },
      ];
      mockFilmsService.getAllFilms.mockResolvedValue(result);

      expect(await filmsController.findAll()).toBe(result);
      expect(mockFilmsService.getAllFilms).toHaveBeenCalled();
    });
  });

  describe('getSchedule', () => {
    it('should return a film by id', async () => {
      const filmId = '1';
      const result: Film = {
        id: '1',
        rating: 5,
        director: 'Director 1',
        tags: ['tag1', 'tag2'],
        image: 'image1',
        cover: 'cover1',
        title: 'Film 1',
        about: 'About 1',
        description: 'Description 1',
        schedule: [],
      };
      mockFilmsService.getFilmById.mockResolvedValue(result);

      expect(await filmsController.getSchedule(filmId)).toBe(result);
      expect(mockFilmsService.getFilmById).toHaveBeenCalledWith(filmId);
    });
  });
});

import { Injectable } from '@nestjs/common';
import { FilmRepository } from '../repository/films.repository';
import { FilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(private readonly filmRepository: FilmRepository) {}

  async createFilm(createFilmDto: FilmDTO) {
    return this.filmRepository.create(createFilmDto);
  }

  async getAllFilms() {
    const films = await this.filmRepository.findAll();
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmById(id: string) {
    const result = await this.filmRepository.findOne(id);
    return { total: result.schedule.length, items: result.schedule };
  }
}

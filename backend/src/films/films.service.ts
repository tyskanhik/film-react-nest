import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from './entities/film.entity';
import { FilmDTO } from './dto/films.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepository: Repository<Film>,
  ) {}

  async createFilm(createFilmDto: FilmDTO): Promise<Film> {
    const film = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(film);
  }

  async getAllFilms() {
    const films = await this.filmRepository.find();
    return {
      total: films.length,
      items: films,
    };
  }

  async getFilmById(id: string) {
    const result = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!result) {
      throw new Error('Film not found');
    }
    result.schedule.sort((a, b) => {
      return new Date(a.daytime).getTime() - new Date(b.daytime).getTime();
    });

    return { total: result.schedule.length, items: result.schedule };
  }
}

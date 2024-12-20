import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Film } from './entities/film.entity';
import { FilmDTO } from './dto/films.dto';

@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Get()
  async findAll() {
    return this.filmsService.getAllFilms();
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    return this.filmsService.getFilmById(id);
  }

  @Post()
  async create(@Body() film: FilmDTO): Promise<Film> {
    return this.filmsService.createFilm(film);
  }
}

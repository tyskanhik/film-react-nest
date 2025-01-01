import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../films/entities/film.entity';
import { FilmDTO } from '../films/dto/films.dto';
import { Schedule } from '../films/entities/schedule.entity';

@Injectable()
export class FilmRepository {
  constructor(
    @InjectRepository(Film)
    private filmRepository: Repository<Film>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(createFilmDto: FilmDTO): Promise<Film> {
    const createdFilm = this.filmRepository.create(createFilmDto);
    return this.filmRepository.save(createdFilm);
  }

  async findAll(): Promise<Film[]> {
    return this.filmRepository.find();
  }

  async findOne(id: string): Promise<Film> {
    const result = await this.filmRepository.findOne({
      where: { id },
      relations: ['schedule'],
    });

    if (!result) {
      throw new Error('Film not found');
    }

    return result;
  }

  async updateFilmSchedule(schedule: Schedule[]) {
    return await this.scheduleRepository.save(schedule);
  }
}

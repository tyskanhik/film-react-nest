import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Film, FilmDocument } from '../films/dto/film.schema';
import { FilmDTO, GetScheduleDTO } from '../films/dto/films.dto';

@Injectable()
export class FilmRepository {
  constructor(@InjectModel(Film.name) private filmModel: Model<FilmDocument>) {}

  async create(createFilmDto: FilmDTO): Promise<Film> {
    const createdFilm = new this.filmModel(createFilmDto);
    return createdFilm.save();
  }

  async findAll(): Promise<Film[]> {
    return this.filmModel.find();
  }

  async findOne(id: string): Promise<Film> {
    return this.filmModel.findOne({ id: id });
  }

  async updateFilmSchedule(id: string, schedule: GetScheduleDTO[]) {
    const result = await this.filmModel.updateOne(
      { id: id },
      {
        $set: { schedule },
      },
    );
    return result;
  }
}

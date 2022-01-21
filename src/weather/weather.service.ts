import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WeatherLog } from '../db/entity/WeatherLog';

@Injectable()
export class WeatherService {
  constructor(
    @InjectRepository(WeatherLog)
    private readonly weatherLogRepository: Repository<WeatherLog>,
  ) {}

  async getCurrentWeather({ city }: { city: string }) {
    try {
      if (!city) {
        throw Error('missing parameters');
      }
      const res = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPENWEATHER_API_KEY}`,
      );
      return res;
    } catch (err) {
      throw err;
    }
  }

  async updateWeatherLog({
    city,
    description,
  }: {
    city: string;
    description: string;
  }) {
    try {
      if (!city || !description) {
        throw Error('missing parameters');
      }
      const log = await this.weatherLogRepository.save({
        city,
        description,
      });
      return log;
    } catch (err) {
      throw err;
    }
  }
}

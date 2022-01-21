import { Body, Controller, Get } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    private readonly userService: UserService,
  ) {}

  @Get('user')
  async getUserWeather(@Body() { username }: { username: string }) {
    const { city } = await this.userService.getUser({ username });
    const weather = await this.weatherService.getCurrentWeather({
      city,
    });
    const log = await this.weatherService.updateWeatherLog({
      city,
      description: weather.data.weather[0].description,
    });
    return log;
  }
}

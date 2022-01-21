import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from '../../src/weather/weather.controller';
import { WeatherService } from '../../src/weather/weather.service';

describe('Weather', () => {
  let weatherController: WeatherController;

  beforeEach(async () => {
    const weather: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    weatherController = weather.get<WeatherController>(WeatherController);
  });

  describe('get weather by user', () => {
    it('should find user city, call openweather API and update weather log', async () => {
      expect.assertions(2);
      const res = await weatherController.getUserWeather({ username: 'joe' });
      console.log(res, 'dasjosj');
      // db is called to find user
      // openweather API is called with user city
      // weather log is updated with description
    });
  });
});

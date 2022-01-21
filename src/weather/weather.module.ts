import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WeatherService } from './weather.service';
import { WeatherController } from './weather.controller';
import { WeatherLog } from '../db/entity/WeatherLog';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([WeatherLog])],
  providers: [WeatherService],
  controllers: [WeatherController],
})
export class WeatherModule {}

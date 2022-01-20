import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entity/User';
import { Login } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async createUser({ username, password, location }: Login) {
    try {
      if (!username || !password) {
        throw Error('missing parameters');
      }
      const res = await this.userRepository.save({
        username,
        password,
        location: location ? location : 'HK',
      });
      if (!res) {
        throw Error('db error');
      }
      return res;
    } catch (err) {
      throw err;
    }
  }

  async loginUser({ username, password }: Login) {
    try {
      if (!username || !password) {
        throw Error('missing parameters');
      }
      const res = await this.userRepository.find({
        where: { username, password },
      });
      if (!res || !res.length) {
        throw new Error('login user failed');
      }
      return res;
    } catch (err) {
      throw err;
    }
  }
}

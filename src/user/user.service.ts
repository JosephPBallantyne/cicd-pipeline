import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entity/User';
import { Login, UserPublic } from './user.types';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async getUser({ username }: { username: string }): Promise<UserPublic> {
    try {
      if (!username) {
        throw Error('missing parameters');
      }
      const user = await this.userRepository.find({
        where: { username },
      });
      if (!user || user.length != 1) {
        throw Error('user not found');
      }
      return {
        username: user[0].username,
        city: user[0].city,
      };
    } catch (err) {
      throw err;
    }
  }

  async createUser({ username, password, city }: Login) {
    try {
      if (!username || !password) {
        throw Error('missing parameters');
      }
      const res = await this.userRepository.save({
        username,
        password,
        city: city ? city : 'HK',
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

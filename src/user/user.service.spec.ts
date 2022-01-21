import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockType, repositoryMockFactory } from '../db/repositoryMock';
import { UserService } from './user.service';
import { User } from '../db/entity/User';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let userService: UserService;
  let repositoryMock: MockType<Repository<User>>;

  beforeEach(async () => {
    const user: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useFactory: repositoryMockFactory,
        },
      ],
    }).compile();

    userService = user.get<UserService>(UserService);
    repositoryMock = user.get(getRepositoryToken(User));
  });

  describe('create user', () => {
    it('should create user with a username and password', async () => {
      expect.assertions(2);
      const USER_INPUT = {
        username: 'user',
        password: 'pass',
        city: 'HK',
      };
      const USER_OUTPUT = [
        {
          id: 1,
          username: 'user',
          password: 'pass',
          city: 'HK',
        },
      ];
      repositoryMock.save.mockReturnValue(USER_OUTPUT);
      const createdUser = await userService.createUser(USER_INPUT);
      expect(repositoryMock.save).toHaveBeenCalledWith(USER_INPUT);
      expect(createdUser).toEqual(USER_OUTPUT);
    });

    it('should not create user with a null username', async () => {
      expect.assertions(1);
      const USER_INPUT = {
        username: '',
        password: 'pass',
        city: 'HK',
      };
      await expect(
        async () => await userService.createUser(USER_INPUT),
      ).rejects.toThrow();
    });

    it('should not create user with a null password', async () => {
      expect.assertions(1);
      const USER_INPUT = {
        username: 'user',
        password: '',
        city: 'HK',
      };
      await expect(
        async () => await userService.createUser(USER_INPUT),
      ).rejects.toThrow();
    });
  });

  describe('login', () => {
    it('should log user in, correct username and password', async () => {
      expect.assertions(2);
      const LOGIN = {
        username: 'user',
        password: 'pass',
      };
      const USER_OUTPUT = [
        {
          id: 1,
          username: 'user',
          password: 'pass',
          city: 'HK',
        },
      ];
      repositoryMock.find.mockReturnValue(USER_OUTPUT);
      const user = await userService.loginUser(LOGIN);
      expect(repositoryMock.find).toHaveBeenCalledWith({ where: LOGIN });
      expect(user).toEqual(USER_OUTPUT);
    });

    it('should not log user in, incorrect username', async () => {
      expect.assertions(1);
      const LOGIN = {
        username: '',
        password: 'pass',
      };
      await expect(
        async () => await userService.loginUser(LOGIN),
      ).rejects.toThrow();
    });

    it('should not log user in, incorrect password', async () => {
      expect.assertions(1);
      const LOGIN = {
        username: 'user',
        password: '',
      };
      await expect(
        async () => await userService.loginUser(LOGIN),
      ).rejects.toThrow();
    });
  });
});

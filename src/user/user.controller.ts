import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from '../user/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  get(@Body() { username }: { username: string }) {
    return this.userService.getUser({ username });
  }

  @Post('create')
  create(@Body() { username, password, city }: Login) {
    return this.userService.createUser({ username, password, city });
  }

  @Post('login')
  login(@Body() { username, password }: Login) {
    return this.userService.loginUser({ username, password });
  }
}

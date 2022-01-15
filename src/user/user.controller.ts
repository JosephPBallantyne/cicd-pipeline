import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { Login } from '../user/user.types';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create')
  create(@Body() { username, password, location }: Login) {
    return this.userService.createUser({ username, password, location });
  }

  @Post('login')
  login(@Body() { username, password }: Login) {
    return this.userService.loginUser({ username, password });
  }
}

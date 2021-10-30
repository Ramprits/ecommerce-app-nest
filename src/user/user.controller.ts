import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from '@app/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  @Post()
  createUser(@Body('user') createUserDto: CreateUserDto) {
    return { user: createUserDto };
  }
}

import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.getUsers();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createUser(@Body() dto: UserDto) {
    return this.userService.createUser(dto);
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }
}

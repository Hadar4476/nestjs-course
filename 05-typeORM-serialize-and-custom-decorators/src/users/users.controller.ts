import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Query,
  NotFoundException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { UsersService } from './users.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

import {
  Serialize,
  SerializeInterceptor,
} from '../interceptors/serialize.interceptor';

import { UserDto } from 'src/users/dtos/user.dto';

@Controller('auth')
// CUSTOM DECORATOR
// applying this decorator to ALL requests instead of EACH.
// if you want to serialize different data, then you should do EACH.
@Serialize(UserDto)
export class UsersController {
  constructor(public usersService: UsersService) {}

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    console.log({ body });

    this.usersService.create(body.email, body.password);
  }

  // // BEFORE CREATING CUSTOM INTERCEPTOR
  // // pointing which request should be intercept after applying the @Exclude decorator on the User entity
  // @UseInterceptors(ClassSerializerInterceptor)

  // // BEFORE CUSTOM DECORATOR
  // @UseInterceptors(new SerializeInterceptor(UserDto)

  @Get('/:id')
  findUser(@Param('id') id: string) {
    console.log('handler is running');

    const user = this.usersService.findOne(+id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.find(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.update(+id, body);
  }
}

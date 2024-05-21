import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/me')
  me() {
    return({get: '/users/me'});
    // return this.usersService.findAll();
  }
  
  @Patch('/me')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return({patch: '/users/me'});
    // return this.usersService.update(+id, updateUserDto);
  }

  @Get('/me/wishes')
  meWishes() {
    return({get: '/users/me/wishes'});
    // return this.usersService.findAll();
  }

  @Get('/:id')
  userName(@Param('id') id: string) {
    return({get: `/users/me/${id}`});
    // return this.usersService.findOne(+id);
  }

  @Get('/:id/wishes')
  userNameWishes(@Param('id') id: string) {
    return({get: `/users/me/${id}/wishes`});
    // return this.usersService.findOne(+id);
  }


  @Post('/find')
  userFind(@Body() createUserDto: CreateUserDto) {
    return({post: `/users/find`});
    // return this.usersService.create(createUserDto);
  }

}

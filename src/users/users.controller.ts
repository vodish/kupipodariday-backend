import { Controller, Get, Post, Body, Patch, Param, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('/me')
  getMe(@Req() req) {
    return req.user;
  }

  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user, updateUserDto);
  }


  @Get('/me/wishes')
  meWishes() {
    return ({ get: '/users/me/wishes' });
    // return this.usersService.findAll();
  }

  @Get('/:name')
  userName(@Param('name') name: string) {

    return this.usersService.userName(name);// ({get: `/users/me/${id}`});
    // return this.usersService.findOne(+id);
  }

  @Get('/:id/wishes')
  userNameWishes(@Param('id') id: string) {
    return ({ get: `/users/me/${id}/wishes` });
    // return this.usersService.findOne(+id);
  }


  @Post('/find')
  userFind(@Body() data: FindUserDto) {
    return ({ post: data });
  }
}

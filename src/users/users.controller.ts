import {
  NotFoundException,
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { WishesService } from 'src/wishes/wishes.service';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly wishesService: WishesService,
  ) {}

  @Get('/me')
  getMe(@Req() req) {
    return req.user;
  }

  @Patch('me')
  update(@Req() req, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(req.user.id, updateUserDto);
  }

  @Get('me/wishes')
  async findMeWishes(@Req() req) {
    return this.wishesService.getByUsername(req.user.username);
  }

  @Get(':username')
  async findOne(@Param('username') username: string) {
    const user = await this.usersService.findByName(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }

  @Get(':username/wishes')
  async findUsersWishes(@Param('username') username: string) {
    const user = await this.usersService.findByName(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return this.wishesService.getByUsername(username);
  }

  @Post('/find')
  async findMany(@Body('query') query: string) {
    return await this.usersService.find(query);
  }
}

import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { WishlistsService } from './wishlists.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('/wishlistlists')
export class WishlistsController {
  constructor(private readonly wishlistsService: WishlistsService) {}

  @Post()
  create(@Req() req, @Body() dto: CreateWishlistDto) {
    return this.wishlistsService.create(req.user.id, dto);
  }

  @Get()
  findAll() {
    return this.wishlistsService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.wishlistsService.findOneById(Number(id));
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Req() req, @Body() dto: UpdateWishlistDto) {
    return this.wishlistsService.update(Number(id), dto, req.user.id);
  }

  @Delete('/:id')
  remove(@Param('id') id: string, @Req() req) {
    return this.wishlistsService.remove(Number(id), req.user.id);
  }
}

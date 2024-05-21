import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishlistlistsService } from './wishlistlists.service';
import { CreateWishlistlistDto } from './dto/create-wishlistlist.dto';
import { UpdateWishlistlistDto } from './dto/update-wishlistlist.dto';

@Controller('wishlistlists')
export class WishlistlistsController {
  constructor(private readonly wishlistlistsService: WishlistlistsService) { }

  @Post()
  create(@Body() createWishlistlistDto: CreateWishlistlistDto) {
    return ({ post: createWishlistlistDto });
    // return this.wishlistlistsService.create(createWishlistlistDto);
  }

  @Get()
  getAll() {
    return ({ get: `/wishlistlists` });
    // return this.wishlistlistsService.findAll();
  }

  @Get(':id')
  getId(@Param('id') id: number) {
    return ({ get: `/wishlistlists/${id}` });
    // return this.wishlistlistsService.findOne(+id);
  }

  @Patch(':id')
  patchId(@Param('id') id: number, @Body() updateWishlistlistDto: UpdateWishlistlistDto) {
    return ({ patch: updateWishlistlistDto });
    // return this.wishlistlistsService.update(+id, updateWishlistlistDto);
  }

  @Delete(':id')
  deleteId(@Param('id') id: number) {
    return ({ delete: `/wishlistlists/${id}` });
    // return this.wishlistlistsService.remove(+id);
  }
}

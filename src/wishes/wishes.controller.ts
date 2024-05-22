import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WishesService } from './wishes.service';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';

@Controller('wishes')
export class WishesController {
  constructor(private readonly wishesService: WishesService) {}

  @Post()
  create(@Body() createWishDto: CreateWishDto) {
    // return({post: createWishDto})
    return this.wishesService.create(createWishDto);
  }

  @Get('/last')
  last() {
    return({get: 'wishes/last'});
    // return this.wishesService.findAll(); 
  }

  @Get('/top')
  top() {
    return({get: 'wishes/top'});
    // return this.wishesService.findAll();
  }

  @Get(':id')
  getId(@Param('id') id: number) {
    return({get: `wishes/${+id}`});
    // return this.wishesService.findOne(+id);
  }

  @Patch(':id')
  patchId(@Param('id') id: number, @Body() updateWishDto: UpdateWishDto) {
    return({patch: `wishes/${+id}`, data: updateWishDto});
    // return this.wishesService.update(+id, updateWishDto);
  }

  @Delete(':id')
  deleteId(@Param('id') id: number) {
    return({delete: `wishes/${+id}`});
    // return this.wishesService.remove(+id);
  }

  @Post(':id/copy')
  postIdCopy(@Param('id') id: number) {
    return({copy: `wishes/${+id}/copy`});
    // return this.wishesService.remove(+id);
  }
}

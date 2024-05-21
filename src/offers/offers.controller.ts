import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';

@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return({post: createOfferDto})
    // return this.offersService.create(createOfferDto);
  }

  @Get()
  findAll() {
    return({get: '/offers'})
    // return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return({get: `/offers/${id}`})
    // return this.offersService.findOne(+id);
  }
}

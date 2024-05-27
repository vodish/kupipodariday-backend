import { Controller, Get, Post, Body, UseGuards, Param, Req } from '@nestjs/common';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('offers')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @Post()
  create(@Req() req, @Body() createOfferDto: CreateOfferDto) {
    const userId = req.user.id;
    return this.offersService.create(createOfferDto, Number(userId));
  }

  @Get()
  findAll() {
    return this.offersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offersService.findOne(Number(id));
  }
}

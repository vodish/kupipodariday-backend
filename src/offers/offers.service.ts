import { Injectable, ConflictException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { Offer } from './entities/offer.entity';
import { Wish } from 'src/wishes/entities/wish.entity';
import { User } from 'src/users/entities/user.entity';


@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepository: Repository<Offer>,

    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,

    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }


  async create(userId: number, data: CreateOfferDto) {

    const wish = await this.wishRepository.findOneBy({ id: data.itemId });

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    // добавить с счетчику всех донатов
    const raised = wish.raised + data.amount;

    const newOffer = this.offerRepository.save({
      ...data,
      item: wish,
      user: this.userRepository.create({ id: userId }),
    });
  }



  findAll() {
    return this.offerRepository.find({
      relations: ['items'],
    });
  }



  findOne(id: number) {
    return this.offerRepository.findOne({
      where: { id },
      relations: { user: true },
    });
  }
}

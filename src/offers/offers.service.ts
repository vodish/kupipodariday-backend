import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  async create(userId: number, data: CreateOfferDto) {
    const wish = await this.wishRepository.findOneBy({ id: data.itemId });

    if (!wish) {
      throw new NotFoundException('Подарок не найден');
    }

    // добавить к счетчику всех донатов
    await this.wishRepository.save({
      ...wish,
      raised: Number(wish.raised) + data.amount, // typeorm не умеет адекватно в decimal
    });

    // записать донат в список
    return await this.offerRepository.save({
      ...data,
      item: wish,
      user: this.userRepository.create({ id: userId }),
    });
  }

  async findAll() {
    return await this.offerRepository.find({
      order: { id: 'DESC' },
      take: 50,
      relations: { user: true, item: true },
    });
  }

  async findOne(id: number) {
    const offer = await this.offerRepository.findOne({
      where: { id },
      relations: { user: true, item: true },
    });

    if (!offer) {
      throw new NotFoundException('Запись не найдена');
    }

    return offer;
  }
}

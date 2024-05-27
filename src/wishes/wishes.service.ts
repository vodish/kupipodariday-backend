import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private dataSource: DataSource
  ) { }


  async create(data: CreateWishDto) {
    const owner = this.userRepository.create({ id: 1 }) // создаю объект, но не добавляю в бд

    try {
      return await this.wishRepository.save({ ...data, owner });
    }
    catch (err) {
      throw new ConflictException(err.message);
    }
  }

  async getLast() {
    return await this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      order: {
        createdAt: 'DESC',
      },
      take: 40,
    });
  }

  async getTop() {
    return await this.wishRepository.find({
      relations: {
        owner: true,
        offers: true,
      },
      order: {
        copied: 'DESC',
      },
      take: 20,
    });
  }

  async getOne(id: number) {
    const row = await this.wishRepository.findOne({
      where: { id },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (!row) {
      throw new NotFoundException('Подарок не найден');
    }

    return row;
  }


  async getByUsername(username: string) {
    const list = await this.wishRepository.find({
      where: { owner: this.userRepository.create({username}) },
      order: {
        createdAt: 'ASC',
      },
      relations: {
        owner: true,
        offers: true,
      },
    });

    if (!list) {
      throw new NotFoundException('Подароки не найдены');
    }

    return list;
  }


  async update(id: number, userId: number, updateWishDto: UpdateWishDto) {
    const newWish = await this.getOne(id);

    if (newWish.owner.id !== userId) {
      throw new BadRequestException('Это чужой подарок');
    }

    return this.wishRepository.save({
      id,
      ...updateWishDto,
    });
  }


  async remove(id: number, userId: number) {
    const row = await this.getOne(id);

    if (row.owner.id !== userId) {
      throw new BadRequestException('Это чужой подарок');
    }

    await this.wishRepository.delete({ id });

    return { status: 'удален', ...row };
  }


  async copy(wishId: number, userId: number) {
    const wish = await this.getOne(wishId);

    // обновить старый подарок
    await this.wishRepository.save({ ...wish, copied: wish.copied + 1 });

    // добавить новый подарок
    return await this.wishRepository.save({
      name: wish.name,
      link: wish.link,
      image: wish.image,
      price: wish.price,
      description: wish.description,
      owner: this.userRepository.create({ id: userId }),
    });
  }
}

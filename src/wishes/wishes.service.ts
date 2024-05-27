import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
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
    
    if ( !row ) {
      throw new NotFoundException('Подарок не найден');
    }

    return row;
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
      throw new Error('Это чужой подарок');
    }

    await this.wishRepository.delete({ id });

    return {status: 'удален', ...row};
  }


  async copyWish(wishId: number, userId: number) {
    const originalWish = await this.wishRepository.findOneBy({ id: wishId });

    if (!originalWish) {
      throw new Error('Данный подарок уже существует');
    }
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error('Такой пользователь не найден');
    }

    const wishData: CreateWishDto = {
      name: originalWish.name,
      description: originalWish.description,
      link: originalWish.link,
      image: originalWish.image,
      price: originalWish.price,
    };

    originalWish.copied += 1;

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.insert(Wish, {
        ...wishData,
        owner: user,
      });
      delete user.password;
      await queryRunner.manager.save(originalWish);
      await queryRunner.commitTransaction();
      return {};
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
    }
  }
}

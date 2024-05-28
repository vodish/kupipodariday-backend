import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';


@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(Wish)
    private wishRepository: Repository<Wish>,
  ) { }

  async create(userId: number, data: CreateWishlistDto) {
    const user = this.userRepository.create({ id: userId });

    const wishes = await this.wishRepository.find({
      where: {
        id: In(data.itemsId)
      },
    });

    const wishlist = await this.wishlistRepository.save({
      ...data,
      user,
      wishes
    });

    return wishlist;
  }


  async findAll() {
    return await this.wishlistRepository.find({
      relations: { user: true, wishes: true },
      take: 50,
    });
  }


  async findOneById(id: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
      relations: { user: true, wishes: true }
    });

    if (!wishlist) {
      throw new NotFoundException('Не найден альбом');
    }

    return wishlist;
  }


  async update(id: number, dto: UpdateWishlistDto, userId: number) {
    const wishlist = await this.findOneById(id);

    if (!wishlist) {
      throw new NotFoundException('Не найден альбом');
    }

    if (wishlist.user.id !== userId) {
      throw new ForbiddenException('Чужой альбом');
    }

    const wishes = await this.wishRepository.find({
      where: {
        id: In(dto.itemsId)
      },
    });

    return await this.wishlistRepository.save({
      ...wishlist,
      name: dto.name,
      image: dto.image,
      description: dto.description,
      wishes: wishes,
    });
  }


  async remove(id: number, userId: number) {
    const wishlist = await this.wishlistRepository.findOne({
      where: {
        id: id,
        user: this.userRepository.create({id: userId})
      }
    });

    if (!wishlist) {
      throw new NotFoundException('Не найден альбом');
    }

    await this.wishlistRepository.delete({ id });

    return { status: 'удален', ...wishlist };
  }
}

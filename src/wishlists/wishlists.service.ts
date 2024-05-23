import { Injectable, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';
import { User } from 'src/users/entities/user.entity';
import { Wish } from 'src/wishes/entities/wish.entity';


@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>
  ) { }


  async create(data: CreateWishlistDto) {
    const user = this.userRepository.create({ id: data.owner })

    const wishes = data.itemsId.reduce((wishes: Wish[], el) => {
      wishes.push(this.wishRepository.create({ id: el }))
      return wishes;
    }, []);
    

    try {
      return await this.wishlistRepository.save({ ...data, user, wishes });
    }
    catch (err) {
      throw new ConflictException(err.message)
    }
  }


  findAll() {
    return this.wishlistRepository.find({
      where: {
        user: this.userRepository.create({ id: 1 })
      },
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}

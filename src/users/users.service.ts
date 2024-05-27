import { NotFoundException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BCRIPT_SALT } from 'src/config/app.config';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }



  async findByName(username: string, addPassword: boolean = false) {
    if (addPassword) {
      // запрос через createQueryBuilder, чтобы отдал поле password,
      // которое исключено из объекта пользователя по-умолчанию в описании entity
      const userRaw = await this.userRepository
          .createQueryBuilder()
          .where('username = :username', {username})
          .addSelect('password as User_password')
          .getRawOne();
      
      // очистить поля от алисов typeorm
      for (let key in userRaw) {
        userRaw[key.replace(/\S+_/, '')] = userRaw[key];
        delete userRaw[key];
      }

      // console.log('userRaw', userRaw);
      return userRaw;
    }

    return await this.userRepository.findOneBy({ username });
  }


  async userName(username: string) {
    const user = await this.userRepository.findOne({
      where: [
        { username },
        { email: username }
      ],
      relations: {
        wishes: true,
        offers: true,
        wishlists: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    return user;
  }


  async update(userId: number, data: UpdateUserDto) {
    const updUser = await this.userRepository.save({
      id: userId,
      ...data,
      username: undefined,
      email: undefined,
      password: await bcrypt.hash(data.password, BCRIPT_SALT),
    });
    
    return {...updUser, password: undefined};
  }


  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

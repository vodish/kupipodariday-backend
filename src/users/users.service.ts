import { NotFoundException, Injectable, ConflictException } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { BCRIPT_SALT } from 'src/config/app.config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async findById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async findByName(username: string, addPassword = false) {
    if (addPassword) {
      // запрос через createQueryBuilder, чтобы отдал поле password,
      // которое исключено из объекта пользователя по-умолчанию в описании entity
      const userRaw = await this.userRepository
        .createQueryBuilder()
        .where('username = :username', { username })
        .addSelect('password as User_password')
        .getRawOne();

      // очистить поля от алисов typeorm
      for (const key in userRaw) {
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
      where: [{ username }, { email: username }],
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

  async update(userId: number, dto: UpdateUserDto) {
    const findUser = await this.userRepository.findOne({
      where: [
        { username: dto.username },
        { email: dto.email },
      ]
    });

    if (findUser && findUser.id !== userId) {
      if (findUser.email === dto.email) {
        throw new ConflictException('Такой [емеил] уже занят')
      }
      if (findUser.username === dto.username) {
        throw new ConflictException('Такой [username] уже занят')
      }
    }

    const updUser = await this.userRepository.save({
      id: userId,
      ...dto,
      password: await bcrypt.hash(dto.password, BCRIPT_SALT),
    });

    return { ...updUser, password: undefined };
  }

  async find(query: string) {
    const users = await this.userRepository.find({
      where: [{ username: Like(`%${query}%`) }, { email: Like(`%${query}%`) }],
    });

    if (!users.length) {
      throw new NotFoundException('Пользователь не найден');
    }

    return users;
  }
}

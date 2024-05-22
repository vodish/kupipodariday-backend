import { Injectable, HttpStatus, ArgumentsHost, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SigninUserDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';





@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }


  async signUp(data: CreateUserDto) {
    const check = await this.userRepository.findOne({
      where: [
        { email: data.email },
        { username: data.username },
      ]
    })

    if (check) {
      // return response
      //   .status(HttpStatus.BAD_REQUEST)
      //   .json({
      //     error: {
      //       status: HttpStatus.BAD_REQUEST,
      //       message: 'User already exists',
      //     }
      //   });
      throw new ConflictException('username already exist');
      // return 'User already exists';
    }
    
    // return this.userRepository.insert(data);
    return this.userRepository.save(data);
  }


  signIp(createAuthDto: SigninUserDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: SigninUserDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}

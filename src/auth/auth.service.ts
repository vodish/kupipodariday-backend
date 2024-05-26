import { Injectable, HttpStatus, ArgumentsHost, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SigninUserDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { BCRIPT_SALT } from 'src/config/app.config';


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
      throw new ConflictException('username already exist');
    }
    
    
    const newUser = {...data, password: await bcrypt.hash(data.password, BCRIPT_SALT)};

    return this.userRepository.save(newUser);
  }


  signIn(createAuthDto: SigninUserDto) {
    return 'This action adds a new auth';
  }

}

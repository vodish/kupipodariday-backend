import { Injectable, HttpStatus, ArgumentsHost, ConflictException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { SigninUserDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from "bcrypt";
import { BCRIPT_SALT } from 'src/config/app.config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,

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


    const newUser = await this.userRepository.save({
      ...data,
      password: await bcrypt.hash(data.password, BCRIPT_SALT),
    });

    const jwtPayload = { usernane: newUser.username, sub: newUser.id };

    return { access_token: this.jwtService.sign(jwtPayload) };
  }


  signIn(user: User) {
    console.log('AuthService -- signIn()');

    const payload = { usernane: user.username, sub: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }
}

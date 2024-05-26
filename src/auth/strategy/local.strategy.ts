import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private userService: UsersService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {

    console.log('LocalStrategy -- validate()');
    console.log({username, password});

    const user = await this.userService.findByName(username);

    if (!user) {
      throw new NotFoundException('Пользователь не найден');
    }

    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new UnauthorizedException('Пользователь не авторизован');
    }
    
    return user;
  }
}

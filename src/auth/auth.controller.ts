import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';


@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  signIn(@Body() data: SigninUserDto) {
    return this.authService.signIp(data);
  }

  @Post('/signup')
  signUp(@Body() data: CreateUserDto) {
    return this.authService.signUp(data);
  }
}

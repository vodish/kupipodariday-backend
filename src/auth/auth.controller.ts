import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninUserDto } from './dto/signin.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  signin(@Body() data: SigninUserDto) {
    return (data)
    // return this.authService.create(createAuthDto);
  }

  @Post('/signup')
  signup(@Body() data: CreateUserDto) {
    return (data)
    // return this.authService.create(createAuthDto);
  }
}

import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('/signin')
  signin(@Body() createAuthDto: CreateAuthDto) {
    return ({ post: 'singnin' })
    // return this.authService.create(createAuthDto);
  }

  @Post('/signup')
  signup(@Body() createAuthDto: CreateAuthDto) {
    return ({ post: 'signup ' + Date.now() })
    // return this.authService.create(createAuthDto);
  }

}

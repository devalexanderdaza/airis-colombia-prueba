import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';

import { CreateUserDto } from 'src/user/user.dto';
import { UserEntity } from 'src/user/user.entity';

import { AuthService } from './auth.service';

import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() user: CreateUserDto): Promise<UserEntity> {
    const createdUser = await this.authService.signup(user);
    delete createdUser.password;
    return createdUser;
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}

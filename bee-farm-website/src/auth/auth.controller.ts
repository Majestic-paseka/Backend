import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Request } from 'express'; // Добавьте этот импорт

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Request) { // Указали тип Request
    return req.user; // Возвращаем данные пользователя
  }

  @Post('register')
  async register(@Body() data: { 
    email: string; 
    full_name: string; 
    password: string 
  }) {
    return this.authService.register(data);
  }
}
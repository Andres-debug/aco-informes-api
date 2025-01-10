import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register(
    @Body()
    data: {
      nombre: string;
      email: string;
      password: string;
      rol: string; // Este campo es obligatorio
      distritoId?: number; // Este campo es opcional
    },
  ) {
    return this.authService.register(data);
  }
}

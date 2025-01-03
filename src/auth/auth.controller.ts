import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const { email, password } = body;

    // Valida el usuario
    const usuario = await this.authService.validateUsuario(email, password);
    if (!usuario) {
      throw new UnauthorizedException('Credenciales inválidas');
    }

    // Genera y devuelve el token
    return this.authService.login(usuario);
  }
}

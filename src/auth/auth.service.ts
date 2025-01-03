import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from '../usuarios/usuarios.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUsuario(email: string, password: string): Promise<any> {
    const usuario = await this.usuariosService.findUsuarioByEmail(email);
    if (usuario && (await bcrypt.compare(password, usuario.password))) {
      const { password, ...result } = usuario; // Excluir la contraseña
      return result;
    }
    return null;
  }

  async login(usuario: any) {
    const payload = { sub: usuario.id, email: usuario.email, rol: usuario.rol };
    return {
      access_token: this.jwtService.sign(payload), // Firma el token con el ID del usuario como `sub`
    };
  }
}

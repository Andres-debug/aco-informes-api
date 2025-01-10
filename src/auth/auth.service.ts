import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  // Validar credenciales del usuario
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.usuario.findUnique({
      where: { email },
      select: { id: true, email: true, password: true, rol: true, distritoId: true },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user; // Excluir el password del resultado
      return result;
    }
    return null;
  }

  // Generar un token JWT
  async login(user: any) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, rol: true, distritoId: true },
    });

    if (!usuario) {
      throw new Error('Usuario no encontrado');
    }

    const payload = {
      sub: usuario.id,
      email: usuario.email,
      rol: usuario.rol,
      distritoId: usuario.distritoId, // Incluye distritoId en el token
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Registrar un nuevo usuario
  async register(data: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    distritoId?: number; // Distrito opcional
  }) {
    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prisma.usuario.create({
      data: {
        nombre: data.nombre,
        email: data.email,
        password: hashedPassword,
        rol: data.rol,
        distritoId: data.distritoId || null, // Asociar distrito si se proporciona
      },
    });

    return newUser;
  }
}

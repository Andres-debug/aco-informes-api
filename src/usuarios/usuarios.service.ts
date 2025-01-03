import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private prisma: PrismaService) {}

  // Crear un usuario
  async createUsuario(data: { nombre: string; email: string; password: string; rol: string; distritoId?: number }) {
    const { nombre, email, password, rol, distritoId } = data;

    // Validar si el usuario ya existe por email
    const existingUser = await this.prisma.usuario.findUnique({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('El correo electrónico ya está registrado.');
    }

    // Validar si el rol es pastor y necesita distritoId
    if (rol === 'pastor' && !distritoId) {
      throw new BadRequestException('Un pastor debe estar asignado a un distrito.');
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el usuario en la base de datos
    return this.prisma.usuario.create({
      data: { nombre, email, password: hashedPassword, rol, distritoId: rol === 'pastor' ? distritoId : null },
    });
  }

  // Buscar un usuario por email
  async findUsuarioByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  // Listar todos los usuarios
  async getAllUsuarios() {
    return this.prisma.usuario.findMany({
      select: {
        id: true,
        nombre: true,
        email: true,
        rol: true,
        distritoId: true,
        distrito: {
          select: {
            nombreDistrito: true,
          },
        },
      },
    });
  }

  // Buscar un usuario por ID
  async findUsuarioById(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: { distrito: true },
    });
  }
}

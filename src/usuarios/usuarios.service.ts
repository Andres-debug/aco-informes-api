import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsuarioService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los usuarios
  async getAllUsuarios() {
    return this.prisma.usuario.findMany({
      include: { distrito: true },
    });
  }

  // Obtener un usuario por ID
  async getUsuarioById(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      include: { distrito: true },
    });
  }

  // Crear un usuario
  async createUsuario(data: {
    nombre: string;
    email: string;
    password: string;
    rol: string;
    distritoId?: number;
  }) {
    return this.prisma.usuario.create({
      data,
    });
  }

  // Actualizar un usuario
  async updateUsuario(
    id: number,
    data: { nombre?: string; email?: string; password?: string; distritoId?: number },
  ) {
    return this.prisma.usuario.update({
      where: { id },
      data,
    });
  }

  // Eliminar un usuario
  async deleteUsuario(id: number) {
    return this.prisma.usuario.delete({
      where: { id },
    });
  }
}

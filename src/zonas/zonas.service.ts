import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ZonaService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todas las zonas
  async getAllZonas() {
    return this.prisma.zona.findMany({
      include: { distrito: true },
    });
  }

  // Crear una zona
  async createZona(data: { nombre: string; descripcion: string }) {
    return this.prisma.zona.create({
      data,
    });
  }

  // Actualizar una zona
  async updateZona(id: number, data: { nombre?: string; descripcion?: string }) {
    return this.prisma.zona.update({
      where: { id },
      data,
    });
  }

  // Eliminar una zona
  async deleteZona(id: number) {
    return this.prisma.zona.delete({
      where: { id },
    });
  }
}

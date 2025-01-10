import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IglesiaService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todas las iglesias
  async getAllIglesias() {
    return this.prisma.iglesia.findMany({
      include: { distrito: true },
    });
  }

  // Obtener iglesias por distrito
  async getIglesiasByDistrito(distritoId: number) {
    return this.prisma.iglesia.findMany({
      where: { distritoId },
      include: { distrito: true },
    });
  }

  // Obtener iglesias asociadas al pastor autenticado
  async getIglesiasParaPastor(distritoId: number) {
    if (!distritoId) {
      throw new NotFoundException('El pastor no tiene un distrito asignado.');
    }
    return this.prisma.iglesia.findMany({
      where: { distritoId },
    });
  }

  // Crear una iglesia
  async createIglesia(data: { nombreIglesia: string; distritoId: number }) {
    return this.prisma.iglesia.create({
      data,
    });
  }

  // Actualizar una iglesia
  async updateIglesia(
    id: number,
    data: { nombreIglesia?: string; distritoId?: number },
  ) {
    return this.prisma.iglesia.update({
      where: { id },
      data,
    });
  }

  // Eliminar una iglesia
  async deleteIglesia(id: number) {
    return this.prisma.iglesia.delete({
      where: { id },
    });
  }
}

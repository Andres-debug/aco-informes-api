import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistritoService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los distritos
  async getAllDistritos() {
    return this.prisma.distrito.findMany({
      include: { zona: true, iglesia: true, usuario: true },
    });
  }

  // Obtener distritos por zona
  async getDistritosByZona(zonaId: number) {
    return this.prisma.distrito.findMany({
      where: { zonaId },
      include: { iglesia: true },
    });
  }

  // Crear un distrito
  async createDistrito(data: { nombreDistrito: string; zonaId: number }) {
    return this.prisma.distrito.create({
      data,
    });
  }

  // Actualizar un distrito
  async updateDistrito(
    id: number,
    data: { nombreDistrito?: string; zonaId?: number },
  ) {
    return this.prisma.distrito.update({
      where: { id },
      data,
    });
  }

  // Eliminar un distrito
  async deleteDistrito(id: number) {
    return this.prisma.distrito.delete({
      where: { id },
    });
  }
}

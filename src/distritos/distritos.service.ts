import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class DistritosService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllDistritos() {
    return this.prisma.distrito.findMany({
      include: { zona: true, iglesias: true },
    });
  }

  async createDistrito(data: { nombreDistrito: string; zonaId: number }) {
    return this.prisma.distrito.create({ data });
  }

  async getDistritoById(id: number) {
    if (!id || isNaN(id)) {
      throw new Error('El ID del distrito es inválido o no está definido');
    }
  
    const distrito = await this.prisma.distrito.findUnique({
      where: {
        id: id, // Asegúrate de que el campo `id` sea un número
      },
      include: {
        zona: true,
        iglesias: true,
      },
    });
  
    if (!distrito) {
      throw new Error('Distrito no encontrado');
    }
  
    return distrito;
  }

  async updateDistrito(id: number, data: { nombreDistrito?: string; zonaId?: number }) {
    return this.prisma.distrito.update({
      where: { id },
      data,
    });
  }

  async deleteDistrito(id: number) {
    return this.prisma.distrito.delete({ where: { id } });
  }

  async getDistritoByPastor(userId: number) {
    const distrito = await this.prisma.distrito.findFirst({
      where: {
        usuarios: {
          some: { id: userId }, // Busca el distrito asociado al usuario
        },
      },
      include: {
        usuarios: true, // Incluye los usuarios del distrito
        iglesias: true, // Incluye las iglesias del distrito
        zona: true, // Incluye la zona asociada
      },
    });
  
    if (!distrito) {
      throw new Error('No se encontró un distrito para el usuario');
    }
  
    return distrito;
  }
}

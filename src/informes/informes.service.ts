import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InformesService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener todos los informes (solo para administradores)
  async getAllInformes() {
    return this.prisma.informe.findMany({
      include: {
        iglesia: { include: { distrito: { include: { zona: true } } } }, // Información completa de jerarquía
        pastor: true, // Información del pastor
      },
    });
  }

  // Obtener informes por pastor (solo para pastores)
  async getInformesByPastor(pastorId: number) {
    return this.prisma.informe.findMany({
      where: { pastorId },
      include: {
        iglesia: true,
      },
    });
  }

  // Obtener informes filtrados por zona, distrito o iglesia
  async getFilteredInformes(filter: {
    zonaId?: number;
    distritoId?: number;
    iglesiaId?: number;
  }) {
    const { zonaId, distritoId, iglesiaId } = filter;
    return this.prisma.informe.findMany({
      where: {
        iglesia: {
          distrito: {
            zonaId,
            id: distritoId,
          },
          id: iglesiaId,
        },
      },
      include: {
        iglesia: { include: { distrito: true } },
        pastor: true,
      },
    });
  }

  // Crear un informe
  async createInforme(data: {
    actividad: string;
    gastosTransporte: number;
    fecha: Date;
    iglesiaId: number;
    pastorId: number;
  }) {
    return this.prisma.informe.create({
      data,
    });
  }

  // Obtener un informe por ID
  async getInformeById(id: number) {
    return this.prisma.informe.findUnique({
      where: { id },
      include: {
        iglesia: { include: { distrito: true } },
        pastor: true,
      },
    });
  }

  // Actualizar un informe (solo pastores)
  async updateInforme(
    id: number,
    data: { actividad?: string; gastosTransporte?: number },
    pastorId: number,
  ) {
    // Verificar que el informe pertenece al pastor
    const informe = await this.prisma.informe.findUnique({ where: { id } });
    if (!informe || informe.pastorId !== pastorId) {
      throw new Error('No tienes permisos para actualizar este informe.');
    }

    return this.prisma.informe.update({
      where: { id },
      data,
    });
  }

  // Eliminar un informe (solo pastores)
  async deleteInforme(id: number, pastorId: number) {
    // Verificar que el informe pertenece al pastor
    const informe = await this.prisma.informe.findUnique({ where: { id } });
    if (!informe || informe.pastorId !== pastorId) {
      throw new Error('No tienes permisos para eliminar este informe.');
    }

    return this.prisma.informe.delete({ where: { id } });
  }
}

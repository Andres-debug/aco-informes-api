import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InformeService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un informe
  async createInforme(data: { titulo: string; periodoInicio: Date; periodoFin: Date; pastorId: number }) {
    return this.prisma.informe.create({
      data: {
        titulo: data.titulo,
        periodoInicio: data.periodoInicio,
        periodoFin: data.periodoFin,
        totalGastos: 0, // Asignar un valor inicial a totalGastos
        totalActividades: 0, // Asignar un valor inicial a totalActividades
        pastorId: data.pastorId, // Vinculamos el informe con el pastor existente
      },
    });
  }

  // Obtener todos los informes de un pastor
  async getInformesByPastor(pastorId: number) {
    return this.prisma.informe.findMany({
      where: { pastorId },
      include: {
        actividad: {
          include: {
            iglesia: true, // Incluye información de la iglesia en las actividades
          },
        },
      },
    });
  }

  // Obtener un informe específico con todas sus actividades
  async getInformeById(id: number) {
    return this.prisma.informe.findUnique({
      where: { id },
      include: {
        actividad: {
          include: {
            iglesia: true, // Incluye información de la iglesia
          },
        },
      },
    });
  }

  // Actualizar un informe (solo datos del informe, no actividades)
  async updateInforme(id: number, data: Partial<{ titulo: string; periodoInicio: Date; periodoFin: Date }>) {
    return this.prisma.informe.update({
      where: { id },
      data,
    });
  }

  // Eliminar un informe (y todas sus actividades asociadas)
  async deleteInforme(id: number) {
    return this.prisma.informe.delete({
      where: { id },
    });
  }
}

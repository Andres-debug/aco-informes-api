import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InformeService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear un informe
  async createInforme(data: {
    titulo: string;
    periodoInicio: Date;
    periodoFin: Date;
    pastorId: number;
    totalGastos: number;
    totalActividades: number;
  }) {
    return this.prisma.informe.create({
      data: {
        titulo: data.titulo,
        periodoInicio: data.periodoInicio,
        periodoFin: data.periodoFin,
        totalGastos: data.totalGastos,
        totalActividades: data.totalActividades,
        usuario: { connect: { id: data.pastorId } },
      },
    });
  }

  // Obtener informes de un pastor
  async getInformesByPastor(pastorId: number) {
    return this.prisma.informe.findMany({
      where: { pastorId },
      include: { actividad: true },
    });
  }

  // Obtener todos los informes (solo para administradores)
  async getAllInformes() {
    return this.prisma.informe.findMany({
      include: {
        actividad: { include: { iglesia: true } },
        usuario: true,
      },
    });
  }

  // Obtener un informe por ID
  async getInformeById(id: number) {
    return this.prisma.informe.findUnique({
      where: { id },
      include: {
        actividad: { include: { iglesia: true } },
        usuario: true,
      },
    });
  }

  // Actualizar un informe
  async updateInforme(
    id: number,
    data: Partial<{
      titulo: string;
      periodoInicio: Date;
      periodoFin: Date;
      totalGastos: number;
      totalActividades: number;
    }>,
  ) {
    return this.prisma.informe.update({
      where: { id },
      data,
    });
  }

  // Eliminar un informe
  async deleteInforme(id: number) {
    return this.prisma.informe.delete({
      where: { id },
    });
  }

  
}

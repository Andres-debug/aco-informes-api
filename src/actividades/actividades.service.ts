import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActividadService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una actividad
  async createActividad(data: {
    titulo: string;
    descripcion: string;
    fecha: Date;
    gastosTransporte: number;
    iglesiaId: number;
    pastorId: number;
    informeId?: number;
  }) {
    return this.prisma.actividad.create({
      data: {
        titulo: data.titulo,
        descripcion: data.descripcion,
        fecha: data.fecha,
        gastosTransporte: data.gastosTransporte,
        iglesia: {
          connect: { id: data.iglesiaId },
        },
        usuario: {
          connect: { id: data.pastorId },
        },
        informe: data.informeId
          ? {
              connect: { id: data.informeId },
            }
          : undefined,
      },
    });
  }

  // Obtener actividades de un informe
  async getActividadesByInforme(informeId: number) {
    return this.prisma.actividad.findMany({
      where: { informeId },
      include: {
        iglesia: true,
        usuario: true,
      },
    });
  }

  // Obtener todas las actividades de un pastor
  async getActividadesByPastor(pastorId: number) {
    return this.prisma.actividad.findMany({
      where: { pastorId },
      include: {
        iglesia: true,
        informe: true,
      },
    });
  }

  // Actualizar una actividad
  async updateActividad(id: number, data: Partial<{ titulo: string; descripcion: string; fecha: Date; gastosTransporte: number }>) {
    return this.prisma.actividad.update({
      where: { id },
      data,
    });
  }

  // Eliminar una actividad
  async deleteActividad(id: number) {
    return this.prisma.actividad.delete({
      where: { id },
    });
  }
}

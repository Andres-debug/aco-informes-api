import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActividadService {
  constructor(private readonly prisma: PrismaService) {}

  // Crear una actividad
  async createActividad(data: {
    titulo: string;
    descripcion: string;
    fecha: string; // Debe ser string ISO-8601
    gastosTransporte?: number; // Opcional
    iglesiaId: number;
    pastorId: number;
    informeId?: number;
  }) {
    try {
      // Validar la fecha
      const fechaValida = new Date(data.fecha);
      if (isNaN(fechaValida.getTime())) {
        throw new BadRequestException('La fecha proporcionada no es válida.');
      }

      return await this.prisma.actividad.create({
        data: {
          titulo: data.titulo,
          descripcion: data.descripcion,
          fecha: fechaValida, // Convertida a Date
          gastosTransporte: data.gastosTransporte || 0, // Si no se proporciona, usar 0
          iglesia: { connect: { id: data.iglesiaId } },
          usuario: { connect: { id: data.pastorId } },
          informe: data.informeId ? { connect: { id: data.informeId } } : undefined,
        },
      });
    } catch (error) {
      console.error('Error al crear la actividad:', error);
      throw error;
    }
  }

  // Obtener actividades de un pastor
  async getActividadesByPastor(pastorId: number) {
    return this.prisma.actividad.findMany({
      where: { pastorId },
      include: { iglesia: true, informe: true },
    });
  }

  // Obtener actividades por informe
  async getActividadesByInforme(informeId: number) {
    return this.prisma.actividad.findMany({
      where: { informeId },
      include: { iglesia: true },
    });
  }

  // Actualizar una actividad
  async updateActividad(
    id: number,
    data: Partial<{
      titulo: string;
      descripcion: string;
      fecha: Date;
      gastosTransporte: number;
      informeId?: number;
    }>,
  ) {
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

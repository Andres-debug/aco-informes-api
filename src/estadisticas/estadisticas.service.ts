import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EstadisticasService {
  constructor(private readonly prisma: PrismaService) {}

  // Totales por zona, distrito e iglesia
  async getGeneralStats(periodoInicio: Date, periodoFin: Date) {
    return this.prisma.zona.findMany({
      include: {
        distrito: {
          include: {
            iglesia: {
              include: {
                actividad: {
                  where: {
                    fecha: {
                      gte: periodoInicio,
                      lte: periodoFin,
                    },
                  },
                  select: {
                    gastosTransporte: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  // Totales personales por pastor
  async getPersonalStats(pastorId: number, periodoInicio: Date, periodoFin: Date) {
    const actividades = await this.prisma.actividad.findMany({
      where: {
        pastorId,
        fecha: {
          gte: periodoInicio,
          lte: periodoFin,
        },
      },
      select: {
        gastosTransporte: true,
        fecha: true,
      },
    });

    const totalGastos = actividades.reduce((sum, act) => sum + act.gastosTransporte, 0);

    return {
      totalActividades: actividades.length,
      totalGastos,
      actividades,
    };
  }
}

import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InformeService {
  constructor(private readonly prisma: PrismaService) {}

  // Obtener estadísticas por tipo (zona, distrito, iglesia, pastor)
  async getStatisticsByTipo(
    tipoInforme: 'zona' | 'distrito' | 'iglesia' | 'pastor',
    referenciaId: number,
    periodoInicio: Date,
    periodoFin: Date,
  ) {
    // Validar fechas
    if (isNaN(periodoInicio.getTime()) || isNaN(periodoFin.getTime())) {
      throw new BadRequestException('El formato de las fechas no es válido.');
    }
    if (periodoInicio > periodoFin) {
      throw new BadRequestException('La fecha de inicio no puede ser mayor que la fecha de fin.');
    }

    // Consultar datos según el tipo
    switch (tipoInforme) {
      case 'zona':
        return this.getZonaStatistics(referenciaId, periodoInicio, periodoFin);
      case 'distrito':
        return this.getDistritoStatistics(referenciaId, periodoInicio, periodoFin);
      case 'iglesia':
        return this.getIglesiaStatistics(referenciaId, periodoInicio, periodoFin);
      case 'pastor':
        return this.getPastorStatistics(referenciaId, periodoInicio, periodoFin);
      default:
        throw new BadRequestException('Tipo de informe no válido.');
    }
  }

  // Estadísticas por zona
  private async getZonaStatistics(zonaId: number, periodoInicio: Date, periodoFin: Date) {
    const distritos = await this.prisma.distrito.findMany({
      where: { zonaId },
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
            },
          },
        },
      },
    });

    const stats = distritos.map((distrito) => {
      const actividades = distrito.iglesia.flatMap((iglesia) => iglesia.actividad);
      const totalGastos = actividades.reduce((sum, act) => sum + (act.gastosTransporte || 0), 0);
      return {
        distrito: distrito.nombreDistrito,
        totalActividades: actividades.length,
        totalGastos,
      };
    });

    return { tipo: 'zona', zonaId, stats };
  }

  // Estadísticas por distrito
  private async getDistritoStatistics(distritoId: number, periodoInicio: Date, periodoFin: Date) {
    const iglesias = await this.prisma.iglesia.findMany({
      where: { distritoId },
      include: {
        actividad: {
          where: {
            fecha: {
              gte: periodoInicio,
              lte: periodoFin,
            },
          },
        },
      },
    });

    const stats = iglesias.map((iglesia) => {
      const totalGastos = iglesia.actividad.reduce((sum, act) => sum + (act.gastosTransporte || 0), 0);
      return {
        iglesia: iglesia.nombreIglesia,
        totalActividades: iglesia.actividad.length,
        totalGastos,
      };
    });

    return { tipo: 'distrito', distritoId, stats };
  }

  // Estadísticas por iglesia
  private async getIglesiaStatistics(iglesiaId: number, periodoInicio: Date, periodoFin: Date) {
    const actividades = await this.prisma.actividad.findMany({
      where: {
        iglesiaId,
        fecha: {
          gte: periodoInicio,
          lte: periodoFin,
        },
      },
    });

    const totalGastos = actividades.reduce((sum, act) => sum + (act.gastosTransporte || 0), 0);

    return {
      tipo: 'iglesia',
      iglesiaId,
      totalActividades: actividades.length,
      totalGastos,
    };
  }

  // Estadísticas por pastor
  private async getPastorStatistics(pastorId: number, periodoInicio: Date, periodoFin: Date) {
    const actividades = await this.prisma.actividad.findMany({
      where: {
        pastorId,
        fecha: {
          gte: periodoInicio,
          lte: periodoFin,
        },
      },
      include: { iglesia: true },
    });

    const actividadesPorIglesia = actividades.reduce((acc, act) => {
      acc[act.iglesia.nombreIglesia] = (acc[act.iglesia.nombreIglesia] || 0) + 1;
      return acc;
    }, {});

    const totalGastos = actividades.reduce((sum, act) => sum + (act.gastosTransporte || 0), 0);

    return {
      tipo: 'pastor',
      pastorId,
      totalActividades: actividades.length,
      totalGastos,
      actividadesPorIglesia,
    };
  }
}

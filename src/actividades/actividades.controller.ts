import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ActividadService } from './actividades.service';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  @Post()
  async createActividad(
    @Body()
    data: {
      titulo: string;
      descripcion: string;
      fecha: string; // Cambiado de Date a string
      gastosTransporte?: number; // Opcional
      iglesiaId: number;
      pastorId: number;
      informeId?: number;
    },
  ) {
    return this.actividadService.createActividad(data);
  }

  @Get('pastor/:pastorId')
  async getActividadesByPastor(@Param('pastorId') pastorId: string) {
    return this.actividadService.getActividadesByPastor(Number(pastorId));
  }

  @Get('informe/:informeId')
  async getActividadesByInforme(@Param('informeId') informeId: string) {
    return this.actividadService.getActividadesByInforme(Number(informeId));
  }

  @Put(':id')
  async updateActividad(
    @Param('id') id: string,
    @Body()
    data: Partial<{
      titulo: string;
      descripcion: string;
      fecha: string; // Cambiado de Date a string
      gastosTransporte?: number; // Opcional
      informeId?: number;
    }>,
  ) {
    const updatedData = {
      ...data,
      fecha: data.fecha ? new Date(data.fecha) : undefined,
    };
    return this.actividadService.updateActividad(Number(id), updatedData);
  }

  @Delete(':id')
  async deleteActividad(@Param('id') id: string) {
    return this.actividadService.deleteActividad(Number(id));
  }
}

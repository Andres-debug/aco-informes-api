import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ActividadService } from './actividades.service';

@Controller('actividades')
export class ActividadController {
  constructor(private readonly actividadService: ActividadService) {}

  // Crear una actividad
  @Post()
  async createActividad(
    @Body()
    data: {
      titulo: string;
      descripcion: string;
      fecha: Date;
      gastosTransporte: number;
      iglesiaId: number;
      pastorId: number;
      informeId?: number;
    },
  ) {
    return this.actividadService.createActividad(data);
  }

  // Obtener actividades de un informe
  @Get('informe/:id')
  async getActividadesByInforme(@Param('id') informeId: string) {
    return this.actividadService.getActividadesByInforme(Number(informeId));
  }

  // Obtener actividades de un pastor
  @Get('pastor/:id')
  async getActividadesByPastor(@Param('id') pastorId: string) {
    return this.actividadService.getActividadesByPastor(Number(pastorId));
  }

  // Actualizar una actividad
  @Put(':id')
  async updateActividad(
    @Param('id') id: string,
    @Body()
    data: Partial<{
      titulo: string;
      descripcion: string;
      fecha: Date;
      gastosTransporte: number;
    }>,
  ) {
    return this.actividadService.updateActividad(Number(id), data);
  }

  // Eliminar una actividad
  @Delete(':id')
  async deleteActividad(@Param('id') id: string) {
    return this.actividadService.deleteActividad(Number(id));
  }
}

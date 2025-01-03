import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  Req,
} from '@nestjs/common';
import { InformesService } from './informes.service';

@Controller('informes')
export class InformesController {
  constructor(private readonly informesService: InformesService) {}

  // Obtener todos los informes (solo administradores)
  @Get()
  async getAllInformes(@Req() req: any) {
    const { rol } = req.user;

    if (rol !== 'administrador') {
      throw new Error('No tienes permisos para ver todos los informes.');
    }

    return this.informesService.getAllInformes();
  }

  // Obtener informes de un pastor (solo pastores)
  @Get('mios')
  async getInformesByPastor(@Req() req: any) {
    const { id, rol } = req.user;

    if (rol !== 'pastor') {
      throw new Error('No tienes permisos para ver informes.');
    }

    return this.informesService.getInformesByPastor(id);
  }

  // Filtrar informes por zona, distrito o iglesia
  @Get('filtro')
  async getFilteredInformes(
    @Query() filter: { zonaId?: string; distritoId?: string; iglesiaId?: string },
    @Req() req: any,
  ) {
    const { rol } = req.user;

    if (rol !== 'administrador') {
      throw new Error('No tienes permisos para filtrar informes.');
    }

    return this.informesService.getFilteredInformes({
      zonaId: filter.zonaId ? Number(filter.zonaId) : undefined,
      distritoId: filter.distritoId ? Number(filter.distritoId) : undefined,
      iglesiaId: filter.iglesiaId ? Number(filter.iglesiaId) : undefined,
    });
  }

  // Crear un informe (solo pastores)
  @Post()
  async createInforme(
    @Body() data: { actividad: string; gastosTransporte: number; fecha: Date; iglesiaId: number },
    @Req() req: any,
  ) {
    const { id, rol } = req.user;

    if (rol !== 'pastor') {
      throw new Error('No tienes permisos para crear informes.');
    }

    return this.informesService.createInforme({
      ...data,
      pastorId: id,
    });
  }

  // Actualizar un informe (solo pastores)
  @Put(':id')
  async updateInforme(
    @Param('id') id: string,
    @Body() data: { actividad?: string; gastosTransporte?: number },
    @Req() req: any,
  ) {
    const { id: pastorId, rol } = req.user;

    if (rol !== 'pastor') {
      throw new Error('No tienes permisos para actualizar informes.');
    }

    return this.informesService.updateInforme(Number(id), data, pastorId);
  }

  // Eliminar un informe (solo pastores)
  @Delete(':id')
  async deleteInforme(@Param('id') id: string, @Req() req: any) {
    const { id: pastorId, rol } = req.user;

    if (rol !== 'pastor') {
      throw new Error('No tienes permisos para eliminar informes.');
    }

    return this.informesService.deleteInforme(Number(id), pastorId);
  }
}

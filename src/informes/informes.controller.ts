import { Controller, Get, Post, Put, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { InformeService } from './informes.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('informes')
@UseGuards(AuthGuard('jwt'))
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  // Crear un informe
  @Post()
  async createInforme(
    @Body() data: { titulo: string; periodoInicio: Date; periodoFin: Date },
    @Req() req: any,
  ) {
    const { sub: pastorId } = req.user; // Obtenemos el ID del pastor desde el JWT
    return this.informeService.createInforme({ ...data, pastorId });
  }

  // Obtener todos los informes del pastor autenticado
  @Get('mios')
  async getInformesByPastor(@Req() req: any) {
    const { sub: pastorId } = req.user;
    return this.informeService.getInformesByPastor(pastorId);
  }

  // Obtener un informe específico
  @Get(':id')
  async getInformeById(@Param('id') id: string) {
    return this.informeService.getInformeById(Number(id));
  }

  // Actualizar un informe
  @Put(':id')
  async updateInforme(
    @Param('id') id: string,
    @Body() data: Partial<{ titulo: string; periodoInicio: Date; periodoFin: Date }>,
  ) {
    return this.informeService.updateInforme(Number(id), data);
  }

  // Eliminar un informe
  @Delete(':id')
  async deleteInforme(@Param('id') id: string) {
    return this.informeService.deleteInforme(Number(id));
  }
}

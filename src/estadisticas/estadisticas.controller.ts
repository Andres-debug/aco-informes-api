import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('estadisticas')
@UseGuards(AuthGuard('jwt'))
export class EstadisticasController {
  constructor(private readonly estadisticasService: EstadisticasService) {}

  // Totales generales (administradores)
  @Get('general')
  async getGeneralStats(
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    const periodoInicio = new Date(inicio);
    const periodoFin = new Date(fin);

    return this.estadisticasService.getGeneralStats(periodoInicio, periodoFin);
  }

  // Totales personales (pastores)
  @Get('personal')
  async getPersonalStats(
    @Req() req: any,
    @Query('inicio') inicio: string,
    @Query('fin') fin: string,
  ) {
    const { sub: pastorId } = req.user;
    const periodoInicio = new Date(inicio);
    const periodoFin = new Date(fin);

    return this.estadisticasService.getPersonalStats(pastorId, periodoInicio, periodoFin);
  }
}

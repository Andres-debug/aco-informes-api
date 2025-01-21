import { Controller, Get, Query, Param } from '@nestjs/common';
import { InformeService } from './informes.service';

@Controller('estadisticas')
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  @Get(':tipoInforme/:id')
  async getStatisticsByTipo(
    @Param('tipoInforme') tipoInforme: 'zona' | 'distrito' | 'iglesia' | 'pastor',
    @Param('id') id: string,
    @Query('periodoInicio') periodoInicio: string,
    @Query('periodoFin') periodoFin: string,
  ) {
    return this.informeService.getStatisticsByTipo(
      tipoInforme,
      Number(id),
      new Date(periodoInicio),
      new Date(periodoFin),
    );
  }
}

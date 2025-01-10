import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { InformeService } from './informes.service';

@Controller('informes')
export class InformeController {
  constructor(private readonly informeService: InformeService) {}

  @Post()
  async createInforme(
    @Body()
    data: {
      titulo: string;
      periodoInicio: Date;
      periodoFin: Date;
      pastorId: number;
      totalGastos: number;
      totalActividades: number;
    },
  ) {
    return this.informeService.createInforme(data);
  }

  @Get('pastor/:pastorId')
  async getInformesByPastor(@Param('pastorId') pastorId: string) {
    return this.informeService.getInformesByPastor(Number(pastorId));
  }

  @Get()
  async getAllInformes() {
    return this.informeService.getAllInformes();
  }

  @Get(':id')
  async getInformeById(@Param('id') id: string) {
    return this.informeService.getInformeById(Number(id));
  }

  @Put(':id')
  async updateInforme(
    @Param('id') id: string,
    @Body()
    data: Partial<{
      titulo: string;
      periodoInicio: Date;
      periodoFin: Date;
      totalGastos: number;
      totalActividades: number;
    }>,
  ) {
    return this.informeService.updateInforme(Number(id), data);
  }

  @Delete(':id')
  async deleteInforme(@Param('id') id: string) {
    return this.informeService.deleteInforme(Number(id));
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { DistritoService } from './distritos.service';

@Controller('distritos')
export class DistritoController {
  constructor(private readonly distritoService: DistritoService) {}

  @Get()
  async getAllDistritos() {
    return this.distritoService.getAllDistritos();
  }

  @Get('zona/:zonaId')
  async getDistritosByZona(@Param('zonaId') zonaId: string) {
    return this.distritoService.getDistritosByZona(Number(zonaId));
  }

  @Post()
  async createDistrito(@Body() data: { nombreDistrito: string; zonaId: number }) {
    return this.distritoService.createDistrito(data);
  }

  @Put(':id')
  async updateDistrito(
    @Param('id') id: string,
    @Body() data: { nombreDistrito?: string; zonaId?: number },
  ) {
    return this.distritoService.updateDistrito(Number(id), data);
  }

  @Delete(':id')
  async deleteDistrito(@Param('id') id: string) {
    return this.distritoService.deleteDistrito(Number(id));
  }
}

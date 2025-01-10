import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ZonaService } from './zonas.service';

@Controller('zonas')
export class ZonaController {
  constructor(private readonly zonaService: ZonaService) {}

  @Get()
  async getAllZonas() {
    return this.zonaService.getAllZonas();
  }

  @Post()
  async createZona(@Body() data: { nombre: string; descripcion: string }) {
    return this.zonaService.createZona(data);
  }

  @Put(':id')
  async updateZona(
    @Param('id') id: string,
    @Body() data: { nombre?: string; descripcion?: string },
  ) {
    return this.zonaService.updateZona(Number(id), data);
  }

  @Delete(':id')
  async deleteZona(@Param('id') id: string) {
    return this.zonaService.deleteZona(Number(id));
  }
}

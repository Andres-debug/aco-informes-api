import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ZonasService } from './zonas.service';

@Controller('zonas')
export class ZonasController {
  constructor(private readonly zonasService: ZonasService) {}

  @Get()
  async getAllZonas() {
    return this.zonasService.getAllZonas();
  }

  @Post()
  async createZona(@Body() data: { nombre: string; descripcion: string }) {
    return this.zonasService.createZona(data);
  }

  @Get(':id')
  async getZonaById(@Param('id') id: string) {
    return this.zonasService.getZonaById(Number(id));
  }

  @Put(':id')
  async updateZona(
    @Param('id') id: string,
    @Body() data: { nombre?: string; descripcion?: string },
  ) {
    return this.zonasService.updateZona(Number(id), data);
  }

  @Delete(':id')
  async deleteZona(@Param('id') id: string) {
    return this.zonasService.deleteZona(Number(id));
  }
}

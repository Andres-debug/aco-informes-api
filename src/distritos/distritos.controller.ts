import { Controller, Get, Post, Put, Delete, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { DistritoService } from './distritos.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

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

  @UseGuards(JwtAuthGuard)
  @Get('mi-distrito')
  async getMiDistrito(@Req() req: any) {
    const userId = req.user?.id; // Obtenemos el ID del usuario desde el token JWT
    if (!userId) {
      throw new Error('El token no contiene un ID de usuario válido');
    }

    return this.distritoService.getMiDistrito(userId);
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

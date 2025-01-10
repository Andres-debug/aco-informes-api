import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { IglesiaService } from './iglesias.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('iglesias')
export class IglesiaController {
  constructor(private readonly iglesiaService: IglesiaService) {}

  // Obtener todas las iglesias
  @Get()
  async getAllIglesias() {
    return this.iglesiaService.getAllIglesias();
  }

  // Obtener iglesias por distrito
  @Get('distrito/:distritoId')
  async getIglesiasByDistrito(@Param('distritoId') distritoId: string) {
    return this.iglesiaService.getIglesiasByDistrito(Number(distritoId));
  }

  // Obtener iglesias asociadas al pastor autenticado
  @UseGuards(JwtAuthGuard)
  @Get('mi-distrito')
  async fetchIglesiasParaPastor(@CurrentUser() user: any) {
    const distritoId = user.distritoId;
    return this.iglesiaService.getIglesiasParaPastor(distritoId);
  }

  // Crear una iglesia
  @Post()
  async createIglesia(@Body() data: { nombreIglesia: string; distritoId: number }) {
    return this.iglesiaService.createIglesia(data);
  }

  // Actualizar una iglesia
  @Put(':id')
  async updateIglesia(
    @Param('id') id: string,
    @Body() data: { nombreIglesia?: string; distritoId?: number },
  ) {
    return this.iglesiaService.updateIglesia(Number(id), data);
  }

  // Eliminar una iglesia
  @Delete(':id')
  async deleteIglesia(@Param('id') id: string) {
    return this.iglesiaService.deleteIglesia(Number(id));
  }
}

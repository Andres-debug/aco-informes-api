import { Controller, Get, Post, Put, Delete, Param, Body,UseGuards, Req } from '@nestjs/common';
import { DistritosService } from './distritos.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('distritos')
export class DistritosController {
  constructor(private readonly distritosService: DistritosService) {}

  @Get()
  async getAllDistritos() {
    return this.distritosService.getAllDistritos();
  }

  @Post()
  async createDistrito(
    @Body() data: { nombreDistrito: string; zonaId: number },
  ) {
    return this.distritosService.createDistrito(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('mi-distrito')
  async getMiDistrito(@Req() req: any) {
    console.log('Usuario autenticado:', req.user); // Verifica que contiene `id`, `email` y `rol`
  
    const userId = req.user.id; // Obtén el ID del usuario desde el token
    if (!userId || isNaN(userId)) {
      throw new Error('El ID del usuario no es válido');
    }
  
    return this.distritosService.getDistritoByPastor(userId);
  }

  @Get(':id')
  async getDistritoById(@Param('id') id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error('El ID debe ser un número válido');
    }
    return this.distritosService.getDistritoById(numericId);
  }
  

  @Put(':id')
  async updateDistrito(
    @Param('id') id: string,
    @Body() data: { nombreDistrito?: string; zonaId?: number },
  ) {
    return this.distritosService.updateDistrito(Number(id), data);
  }

  @Delete(':id')
  async deleteDistrito(@Param('id') id: string) {
    return this.distritosService.deleteDistrito(Number(id));
  }


  

}

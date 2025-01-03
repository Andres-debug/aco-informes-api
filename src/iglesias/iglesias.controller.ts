import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { IglesiasService } from './iglesias.service';

@Controller('iglesias')
export class IglesiasController {
  constructor(private readonly iglesiasService: IglesiasService) {}

  @Get()
  async getAllIglesias() {
    return this.iglesiasService.getAllIglesias();
  }

  @Post()
  async createIglesia(
    @Body() data: { nombreIglesia: string; distritoId: number },
  ) {
    return this.iglesiasService.createIglesia(data);
  }

  @Get(':id')
  async getIglesiaById(@Param('id') id: string) {
    return this.iglesiasService.getIglesiaById(Number(id));
  }

  @Put(':id')
  async updateIglesia(
    @Param('id') id: string,
    @Body() data: { nombreIglesia?: string; distritoId?: number },
  ) {
    return this.iglesiasService.updateIglesia(Number(id), data);
  }

  @Delete(':id')
  async deleteIglesia(@Param('id') id: string) {
    return this.iglesiasService.deleteIglesia(Number(id));
  }
}

import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  async getAllUsuarios() {
    return this.usuarioService.getAllUsuarios();
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: string) {
    return this.usuarioService.getUsuarioById(Number(id));
  }

  @Post()
  async createUsuario(
    @Body() data: { nombre: string; email: string; password: string; rol: string; distritoId?: number },
  ) {
    return this.usuarioService.createUsuario(data);
  }

  @Put(':id')
  async updateUsuario(
    @Param('id') id: string,
    @Body() data: { nombre?: string; email?: string; password?: string; distritoId?: number },
  ) {
    return this.usuarioService.updateUsuario(Number(id), data);
  }

  @Delete(':id')
  async deleteUsuario(@Param('id') id: string) {
    return this.usuarioService.deleteUsuario(Number(id));
  }
}

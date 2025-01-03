import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  async createUsuario(@Body() body: { nombre: string; email: string; password: string; rol: string; distritoId?: number }) {
    return this.usuariosService.createUsuario(body);
  }

  @Get()
  async getAllUsuarios() {
    return this.usuariosService.getAllUsuarios();
  }

  @Get(':id')
  async getUsuarioById(@Param('id') id: number) {
    return this.usuariosService.findUsuarioById(id);
  }
}

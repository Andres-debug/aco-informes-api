// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuarios.service';
import { PrismaModule } from '../prisma/prisma.module'; // Si `UsuariosService` usa Prisma
import { UsuarioController } from './usuarios.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsuarioController], // Importa PrismaModule si `UsuariosService` lo usa
  providers: [UsuarioService],
  exports: [UsuarioService], // Exporta `UsuariosService` para que otros módulos puedan usarlo
})
export class UsuariosModule {}

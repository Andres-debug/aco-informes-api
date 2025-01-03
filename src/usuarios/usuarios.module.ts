// src/usuarios/usuarios.module.ts
import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { PrismaModule } from '../prisma/prisma.module'; // Si `UsuariosService` usa Prisma
import { UsuariosController } from './usuarios.controller';

@Module({
  imports: [PrismaModule],
  controllers: [UsuariosController], // Importa PrismaModule si `UsuariosService` lo usa
  providers: [UsuariosService],
  exports: [UsuariosService], // Exporta `UsuariosService` para que otros módulos puedan usarlo
})
export class UsuariosModule {}

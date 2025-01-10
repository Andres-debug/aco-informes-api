import { Module } from '@nestjs/common';
import { EstadisticasService } from './estadisticas.service';
import { EstadisticasController } from './estadisticas.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [EstadisticasController],
  providers: [EstadisticasService, PrismaService],
})
export class EstadisticasModule {}

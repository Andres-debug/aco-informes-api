import { Module } from '@nestjs/common';
import { ActividadService } from './actividades.service';
import { ActividadController } from './actividades.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService,PrismaService],
})
export class ActividadesModule {}

import { Module } from '@nestjs/common';
import { ActividadService } from './actividades.service';
import { ActividadController } from './actividades.controller';

@Module({
  controllers: [ActividadController],
  providers: [ActividadService],
})
export class ActividadesModule {}

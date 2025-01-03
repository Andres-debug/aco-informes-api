import { Module } from '@nestjs/common';
import { ZonasController } from './zonas.controller';
import { ZonasService } from './zonas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ZonasController],
  providers: [ZonasService,PrismaService]
})
export class ZonasModule {}

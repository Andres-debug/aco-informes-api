import { Module } from '@nestjs/common';
import { ZonaController } from './zonas.controller';
import { ZonaService } from './zonas.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ZonaController],
  providers: [ZonaService,PrismaService]
})
export class ZonasModule {}

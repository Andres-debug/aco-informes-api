import { Module } from '@nestjs/common';
import { DistritoController } from './distritos.controller';
import { DistritoService } from './distritos.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DistritoController],
  providers: [DistritoService,PrismaService]
})
export class DistritosModule {}

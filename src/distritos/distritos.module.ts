import { Module } from '@nestjs/common';
import { DistritosController } from './distritos.controller';
import { DistritosService } from './distritos.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DistritosController],
  providers: [DistritosService,PrismaService]
})
export class DistritosModule {}

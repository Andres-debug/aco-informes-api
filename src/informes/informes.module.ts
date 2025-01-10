import { Module } from '@nestjs/common';
import { InformeService } from './informes.service';
import { InformeController } from './informes.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [InformeService,PrismaService],
  controllers: [InformeController]
})
export class InformesModule {}

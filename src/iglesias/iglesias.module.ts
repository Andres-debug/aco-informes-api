import { Module } from '@nestjs/common';
import { IglesiaService } from './iglesias.service';
import { IglesiaController } from './iglesias.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  providers: [IglesiaService,PrismaService,JwtAuthGuard],
  controllers: [IglesiaController]
})
export class IglesiasModule {}

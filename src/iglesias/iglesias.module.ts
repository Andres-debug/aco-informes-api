import { Module } from '@nestjs/common';
import { IglesiasService } from './iglesias.service';
import { IglesiasController } from './iglesias.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [IglesiasService,PrismaService],
  controllers: [IglesiasController]
})
export class IglesiasModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { ZonasModule } from './zonas/zonas.module';
import { DistritosModule } from './distritos/distritos.module';
import { IglesiasModule } from './iglesias/iglesias.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { AuthModule } from './auth/auth.module';
import { InformesModule } from './informes/informes.module';
import { ActividadesModule } from './actividades/actividades.module';
import { EstadisticasModule } from './estadisticas/estadisticas.module';

@Module({
  imports: [PrismaModule, ZonasModule, DistritosModule, IglesiasModule, UsuariosModule, AuthModule, InformesModule, ActividadesModule, EstadisticasModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

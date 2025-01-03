import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsuariosModule } from '../usuarios/usuarios.module'; // Módulo de Usuarios
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsuariosModule, // Importa Usuarios para buscar credenciales
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET, // Cambia esto por una variable de entorno en producción
      signOptions: { expiresIn: '1h' }, // Expiración del token
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}

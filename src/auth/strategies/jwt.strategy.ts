import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: payload.sub },
      select: { id: true, nombre: true, email: true, rol: true, distritoId: true },
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    return user; // Devuelve `distritoId` incluido
  }
}

import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Asegúrate de tener tu clave secreta configurada
    });
  }

  async validate(payload: any) {
    return {
      sub: payload.sub, // ID del usuario
      email: payload.email,
      rol: payload.rol,
    };
  }
}

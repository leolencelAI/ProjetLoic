//AUTORISATION JWT ET CREATION FICHIER JWT.STRATEGY.TS

import { Injectable, UnauthorizedException } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      secretOrKey: process.env.JWT_SECRET,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // IMPORTANT IL FAUT GARDER CE NOM DE METHODE
  async validate(payload: any) {
    if (!payload.admin) {
        throw new UnauthorizedException('Unauthorized access for non-admin users');
    }
    return { userId: payload.sub, username: payload.username, admin: payload.admin };
  }
}

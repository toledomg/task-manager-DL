import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { JwtPayload } from '../types';
import { RefreshJwtConstants } from '../constants/constants';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: RefreshJwtConstants.secret,
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload): Promise<JwtPayload> {
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();

    return {
      ...payload,
      refreshToken,
    };
  }
}

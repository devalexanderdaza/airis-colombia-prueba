import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExtractJwt, Strategy } from 'passport-jwt';

import { IJwtPayload } from '../auth.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  /**
   * Validate JWT payload
   * @param {IJwtPayload} payload - JWT payload
   * @returns {Promise<IJwtPayload>} - Validated JWT payload
   */
  async validate(payload: IJwtPayload): Promise<IJwtPayload> {
    return {
      sub: payload.sub,
      email: payload.email,
      fullName: payload.fullName,
    };
  }
}

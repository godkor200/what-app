import { AuthService } from '@modules/auth/auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({
  path: path.resolve(
    process.env.NODE_ENV === 'production'
      ? '.production.env'
      : '.development.env',
  ),
});

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrkey: process.env.SECRET_KEY_JWT,
    });
  }

  async validate(payload: string) {
    const user = await this.authService.validateUserByJwt(payload);

    if (!user) {
      throw new UnauthorizedException('권한이 없습니다.');
    }

    return user;
  }
}

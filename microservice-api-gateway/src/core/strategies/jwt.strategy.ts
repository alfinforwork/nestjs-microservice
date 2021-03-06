import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { SECRET } from 'src/consts/jwt.const';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: SECRET,
    });
  }

  async validate(payload: PayloadJWT) {
    return payload;
  }
}

export class PayloadJWT {
  EmailAnggota: string;
  IdAnggota: number;
  sub: number;
  role: string;
}

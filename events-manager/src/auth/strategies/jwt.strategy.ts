import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor() {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'wXjYjNR2mmv2l31gMc/X6f7qCVs7oVZJiHBJhhLOjEs='
		})
	}

	async validate(payload: any) {
    return { id: payload.sub, email: payload.email };
  }
}

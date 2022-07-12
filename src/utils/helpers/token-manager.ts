import jwt from 'jsonwebtoken';
import { MissingParamError } from '../errors/missing-param-error';
import { env } from 'src/config/env';
import { TokenPayloadDTO } from 'src/event/DTOs/tokenPayloadDTO';

export class TokenManager {
  async create(payload: TokenPayloadDTO) {
    const sixHours = 21600;
    try {
      if (!payload) {
        throw new MissingParamError('payload');
      }

      return jwt.sign(payload, env.tokenSecret, { expiresIn: sixHours });
    } catch (error) {
      throw new Error(error);
    }
  }

  async validate(bearerToken: string) {
    if (!bearerToken) {
      throw new MissingParamError('bearerToken');
    }

    const [tokenPrefix, token] = bearerToken.split(' ');

    if (tokenPrefix !== 'Bearer') {
      throw new Error('invalid token prefix-400');
    }

    try {
      return await jwt.verify(token, env.tokenSecret);
    } catch (error) {
      throw new Error('invalid token-401');
    }
  }
}

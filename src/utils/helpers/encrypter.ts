import bcrypt from 'bcryptjs';
import { MissingParamError } from '../errors/missing-param-error';

export class Encrypter {
  async compare(value: string, hash: string) {
    if (!value || !hash) {
      throw new MissingParamError(value ? 'hash' : 'value');
    }

    const isValid = await bcrypt.compare(value, hash);
    return isValid;
  }

  async hash(value: string) {
    const getSalt = 10;
    if (!value) {
      throw new MissingParamError('value');
    }
    const hashed = bcrypt.hashSync(value, getSalt);
    return hashed;
  }
}

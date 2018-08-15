import * as crypto from 'crypto';
import { TGrpcEncryptionAlgorithm } from '../interfaces';

export class Encryption {
  constructor(private algorithm: TGrpcEncryptionAlgorithm, private password: string) {

  }

  public aes256ctr(data: string): string {
    const cipher: crypto.Cipher = crypto.createCipher(this.algorithm, this.password);
    let crypted: string = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
  }
}
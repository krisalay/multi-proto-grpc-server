export type TGrpcEncryptionAlgorithm = 'aes-256-ctr';

export interface IGrpcEncryption {
  algorithm: string;
  password: string;
}

export interface IGrpcOptions {
  encryption: IGrpcEncryption
}

export interface IAuthenticationObject {
  authType: 'jwt-pass' | 'jwt-key';

}
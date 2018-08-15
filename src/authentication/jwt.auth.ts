import * as jwt from 'jsonwebtoken';
import { Authentication } from './authentication';

export class Jwt extends Authentication {
  constructor() {
    super();
  }
  public passwordAuthentication(token: string) {

  }
}
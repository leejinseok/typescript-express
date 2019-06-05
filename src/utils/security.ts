'use strict';

import crypto from 'crypto';
const salt = 'rX6Puo7DUG6scyC7podB3eeYELFrWBkolVlGf2AAQoWMxYQHwElfd0IqgzYcDMmmb5k6fSA8XEYB3se12I5kLQ==';

class SecurityUtil {
  constructor() {};

  static async createHash(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
        resolve(key.toString('base64'));
      });
    })
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
        resolve(key.toString('base64') === hash)
      });
    });

  }
}

export default SecurityUtil;
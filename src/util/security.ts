'use strict';

import crypto from 'crypto';

const salt = 'lZbFGVi6kVRWTOYsvDPU4CcTA1qsEiaTdJQtLGIN/0xPS9sO3IgHLaRAmjkGS5rAj0xR3Cgx7fIu07xzrmpB6w==';

class SecurityUtil {
  constructor() {}

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
        resolve(key.toString('base64') === hash);
      });
    });
  }
}

export default SecurityUtil;
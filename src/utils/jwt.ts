'use strict';

import jwt from 'jsonwebtoken';

const secret = 'wonder123';

class JwtUtil {
  constructor() {}

  static sign(user: any): Promise<any> {
    return new Promise((resolve, reject) => {
      jwt.sign({
        id:user.id,
        name:user.name,
        email: user.email
      },
      secret,
      {
        expiresIn: '7d',
        issuer: 'localhost',
        subject: 'userInfo'
      }, (err, token) => {
        if (err) reject(err)
        resolve(token);
      })
    })
  }

  static verify(token: string): any {
    return jwt.verify(token, secret);
  }
}

export default JwtUtil;
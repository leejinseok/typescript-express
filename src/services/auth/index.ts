'use strict';

import SecurityUtil from '../../utils/security';
import JwtUtil from '../../utils/jwt';
import User from "../../models/User";

class AuthService {
  async login(email: string, password: string): Promise<any> {
    const user = await User.findOne({where: { email }});
    if (!user) {
      return 'no exist user';
    }

    if (await SecurityUtil.compare(password, user.password)) {
      return JwtUtil.sign(user);
    }
  }

  async signup(email: string, name: string, password: string): Promise<any> {
    if (await User.findOne({where: { email }})) {
      return 'already exist email';
    }

    const hash = await SecurityUtil.createHash(password);
    return User.create({
      email,
      name,
      password: hash
    });
  }
}

export default AuthService;
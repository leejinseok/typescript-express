'use strict';


import securityUtil from '../../utils/security';
import User from "../../models/User";

class AuthService {
  async login(email: string, password: string): Promise<any> {
    const user = await User.findOne({where: { email }});
    if (!user) {
      return 'no exist user';
    }

    const matched = await securityUtil.compare(password, user.password);
    return matched;
  }

  async signup(email: string, name: string, password: string): Promise<any> {
    if (await User.findOne({where: { email }})) {
      return 'already exist email';
    }

    const hash = await securityUtil.createHash(password);
    return User.create({
      email,
      name,
      password: hash
    });
  }
}

export default new AuthService();
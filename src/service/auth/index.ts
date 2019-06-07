'use strict';

import User from '../../entity/User';
import {getRepository} from "typeorm";
import SecurityUtil from "../../util/security";

class AuthService {
  constructor() {}

  async signup(email: string, name: string, password: string): Promise<any> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    return getRepository(User).save(user);
  }

  async login (email: string, password: string): Promise<any> {
    const user = await getRepository(User).findOne({ where: { email }});

    if (!user) {
      throw new Error('no exist user');
    }

    if (!SecurityUtil.compare(password, user.password)) {
      throw new Error('password not matched');
    }

    return user;
  }
}

export default AuthService;
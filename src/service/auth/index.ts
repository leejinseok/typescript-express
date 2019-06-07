'use strict';

import DatabaseUtil from "../../util/database";
import User from '../../entity/User';
import {Connection, getConnection} from "typeorm";
import SecurityUtil from "../../util/security";

class AuthService {
  constructor() {}

  async signup(email: string, name: string, password: string): Promise<any> {
    const user = new User();
    user.email = email;
    user.name = name;
    user.password = password;

    const connection = await getConnection();
    const userRepository = connection.getRepository(User);
    return userRepository.save(user);
  }

  async login (email: string, password: string): Promise<any> {
    const connection = await getConnection();
    const userRepository = connection.getRepository(User);
    const user = await userRepository.findOne({ where: { email }});

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
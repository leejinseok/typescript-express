'use strict';

import DatabaseUtil from "../../util/database";
import User from '../../entity/User';
import {Connection, getConnection} from "typeorm";

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
}

export default AuthService;
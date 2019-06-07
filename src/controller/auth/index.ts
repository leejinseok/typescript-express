'use strict';

import {Body, Controller, Get, Post} from "routing-controllers";
import User from "../../entity/User";
import {getRepository} from "typeorm";

@Controller('/api/v1/auth')
export default class AuthController {

  @Post('/login')
  login(@Body() user: User) {
    return user;
  }

  @Post('/signup')
  signup(@Body() user: User) {
    return getRepository(User).save(user);
  }
}
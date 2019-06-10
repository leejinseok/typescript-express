'use strict';

import {Request} from "express";
import {Body, Controller, Get, Middleware, Post, Req, UseAfter} from "routing-controllers";
import User from "../../entity/User";
import {getRepository} from "typeorm";
import SecurityUtil from "../../util/security";

@Controller('/api/v1/auth')
export default class AuthController {

  @Post('/login')
  async login(@Body() user: User, @Req() req: Request): Promise<User | string> {
    console.log(req.user);
    const {email, password} = user;
    user = await getRepository(User).findOne({ where: { email }});

    if (!user) {
      return "no exist user";
    }

    if (!await SecurityUtil.compare(password, user.password)) {
      return "password not matched";
    }

    return user;
  }

  @Post('/signup')
  signup(@Body() user: User) {
    return getRepository(User).save(user);
  }
}
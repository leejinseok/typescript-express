'use strict';

import {Controller, Get, Post} from "routing-controllers";
import {getRepository} from "typeorm";
import User from "../entity/User";
import UserImage from "../entity/UserImage";

@Controller("/api/v1/users")
export default class UserControler {

  @Get()
  findAllUser() {
    return getRepository(User).find({
      relations: [
        "userImage"
      ]
    })
  }

  @Post("/image")
  async uploadUserImage() {
    const userImage = new UserImage();
    userImage.user = await getRepository(User).findOne(1);
    return getRepository(UserImage).save(userImage);
  }
}
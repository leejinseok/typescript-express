'use strict';

import {Body, Controller, Get, Param, Post as PostMapping, QueryParam} from "routing-controllers";
import Post from "../../entity/Post";
import {getRepository} from "typeorm";
import User from "../../entity/User";

@Controller('/api/v1/posts')
export default class PostController {

  @PostMapping()
  async addPost(@Body() post: Post) {
    const user = await getRepository(User).findOne({ where: { id: post.user }});
    post.user = user;
    return getRepository(Post).save(post);
  }

  @Get()
  async findAll(@QueryParam("cursor") cursor: number, @QueryParam("offset") offset: number) {
    return getRepository(Post).find({ skip: cursor, take: offset });
  }

  @Get('/:postId')
  async findOne(@Param("postId") postId: number) {
    return getRepository(Post).find({ where: { id: postId }});
  }
}
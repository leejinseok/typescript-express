'use strict';

import {Body, Controller, Delete, Get, Param, Post as PostMapping, Put, QueryParam} from "routing-controllers";
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
  findAll(@QueryParam("cursor") cursor: number = 0, @QueryParam("offset") offset: number = 10) {
    return getRepository(Post).find({ skip: cursor, take: offset });
  }

  @Get('/:postId')
  findOne(@Param("postId") postId: number) {
    return getRepository(Post).find({
      where: { id: postId },
      relations: [
        "user"
      ]
    });
  }

  @Delete("/:postId")
  delete(@Param("postId") postId: number) {
    return getRepository(Post).delete(postId);
  }

  @Put('/:postId')
  updatePost(@Param("postId") postId: number, @Body() post: Post) {
    post.id = postId;
    return getRepository(Post).save(post);
  }
}
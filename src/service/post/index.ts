'use strict';

import Post from "../../entity/Post";
import User from "../../entity/User";
import {getRepository} from "typeorm";

class PostService {
  constructor() {}

  async addPost(title: string, content: string, userId: number): Promise<Post> {
    const user = await getRepository(User).findOne({ where: { id: userId }});
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    return getRepository(Post).save(post);
  }

  async findPosts(cursor: number = 0, offset: number = 10000): Promise<Post[]> {
    return getRepository(Post).find({
      skip: cursor,
      take: offset
    });
  }

  async findPost(postId: number): Promise<Post> {
    return getRepository(Post).findOne({ where: { id: postId }});
  }

  async deletePost(postId: number): Promise<any> {
    return getRepository(Post).delete(postId);
  }
}

export default PostService;
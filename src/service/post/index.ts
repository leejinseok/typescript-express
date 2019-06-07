'use strict';

import Post from "../../entity/Post";
import User from "../../entity/User";
import {getConnection, getRepository} from "typeorm";

class PostService {
  constructor() {}

  async addPost(title: string, content: string, userId: number): Promise<Post> {
    const connection = await getConnection();
    const userRepository = getRepository(User);
    const user = await userRepository.findOne({ where: { id: userId }});
    const post = new Post();
    post.title = title;
    post.content = content;
    post.user = user;

    const postRepository = getRepository(Post);
    return postRepository.save(post);
  }
}

export default PostService;
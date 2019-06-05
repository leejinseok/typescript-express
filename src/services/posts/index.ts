'use strict';

import User from "../../models/User";

class PostService {
  constructor() {}

  async addPost(userId: number, title: string, content: string): Promise<any> {
    const user = User.findOne({where: {id: userId}});
    return user;
  }
}

export default PostService;
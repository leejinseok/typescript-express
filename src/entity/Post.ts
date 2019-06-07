'use strict';

import {BeforeInsert, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import DateUtils from "../util/date";
import User from "./User";

@Entity({name: 'posts'})
class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @ManyToOne(type => User, user => user.posts)
  user: User;

  @BeforeInsert()
  private beforeInsert() {
    this.createdAt = DateUtils.time();
    this.updatedAt = DateUtils.time();
  }
}

export default Post;
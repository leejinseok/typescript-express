'use strict';

import {BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import DateUtils from "../util/date";
import User from "./User";

@Entity({name: 'posts'})
class Post {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: bigint;

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

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = DateUtils.time();
  }
}

export default Post;
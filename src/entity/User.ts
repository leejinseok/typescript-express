'use strict';

import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import SecurityUtil from "../util/security";
import DateUtils from "../util/date";
import Post from "./Post";
import UserImage from "./UserImage";

@Entity({name: "users"})
class User {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: bigint;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  createdAt: number;

  @Column()
  updatedAt: number;

  @OneToMany(type => Post, post => post.user)
  posts: Post[];

  @OneToOne(type => UserImage, userImage => userImage.user, {
    cascade: true,
    onDelete: "SET NULL"
  })
  @JoinColumn()
  userImage: UserImage;

  @BeforeInsert()
  private async beforeInsert() {
    this.password = await SecurityUtil.createHash(this.password);
    this.createdAt = DateUtils.time();
    this.updatedAt = DateUtils.time();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = Date.now();
  }
}

export default User;
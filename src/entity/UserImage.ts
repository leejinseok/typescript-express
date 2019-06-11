'use strict';

import {BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User";

@Entity({name: 'user_images'})
export default class UserImage {
  @PrimaryGeneratedColumn({type: "bigint"})
  id: bigint;

  @Column()
  filename: string;

  @OneToOne(type => User, user => user.userImage)
  user: User;

  @BeforeInsert()
  private beforeInsert() {
    this.filename = "";
  }
}
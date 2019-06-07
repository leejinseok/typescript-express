'use strict';

import {BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import SecurityUtil from "../util/security";
import DateUtils from "../util/date";

@Entity({name: 'users'})
class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @BeforeInsert()
  private async beforeInsert() {
    this.password = await SecurityUtil.createdHash(this.password);
    this.createdAt = DateUtils.time();
    this.updatedAt = DateUtils.time();
  }

  @BeforeUpdate()
  private beforeUpdate() {
    this.updatedAt = Date.now();
  }
}

export default User;
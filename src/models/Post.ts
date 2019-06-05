'use strict';

import { Sequelize, DataTypes, Model } from "sequelize";
import db from "../database/db";
import User from "./User";

class Post extends Model {
  public id!: number;
  public title!: string;
  public content!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Post.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  ownerId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'posts'
});

export default Post;

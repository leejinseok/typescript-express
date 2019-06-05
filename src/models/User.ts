'use strict';

import { Sequelize, DataTypes, Model} from "sequelize";
import db from "../database/db";
import Post from "./Post";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  tableName: 'users'
});

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'posts'
});

export default User;
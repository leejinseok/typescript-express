'use strict';

import { Sequelize, DataTypes, Model} from "sequelize";
import db from "../database/db";
import Post from "./Post";

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init({
  id: {
    type: DataTypes.INTEGER.UNSIGNED, // you can omit the `new` but this is discouraged
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
  },
  email: {
    type: new DataTypes.STRING(128),
    allowNull: false,
  }
}, {
  sequelize: db,
  tableName: 'users',
});

User.hasMany(Post, {
  sourceKey: 'id',
  foreignKey: 'ownerId',
  as: 'posts' // this determines the name in `associations`!
});

export default User;
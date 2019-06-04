'use strict';

import dotenv from 'dotenv';
dotenv.config();

import {
  User,
  Post
} from '../models/';

export default function sync() {
  User.sync({ force: true });
  Post.sync({ force: true });
}

sync();
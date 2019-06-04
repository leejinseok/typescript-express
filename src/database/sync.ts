import dotenv from 'dotenv';
dotenv.config();

import {
  User
} from '../models/';

export default function sync() {
  User.sync();
}

sync();
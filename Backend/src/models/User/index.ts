import mongoose, { Schema } from "mongoose";

import IUser from './.d';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  provider: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
import mongoose, { Schema } from "mongoose";
import { compareSync, hashSync } from 'bcrypt';

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
  provider: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

userSchema.pre<IUser>('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (password: string) {
  return compareSync(password, this.password);
}

userSchema.methods.resetPassword = function (password: string) {
  this.password = hashSync(password, 10);
  this.save();
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
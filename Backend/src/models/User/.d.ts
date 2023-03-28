import { Document } from 'mongoose';

export default interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  date: Date;
  provider: "google" | "facebook" | "local";
  comparePassword(password: string): boolean;
  resetPassword(password: string): void;
}
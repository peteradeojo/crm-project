import { Document, PopulatedDoc } from "mongoose";
import IUser from "../User/";

export default interface IContact extends Document {
  name: string;
  email?: string;
  tel?: {
    work?: string[];
    home?: string[];
    mobile?: string[];
  };
  address: {
    street: string;
    city: string;
    state: string;
    zip?: string;
    country: string;
  };
  user: PopulatedDoc<IUser>;
}
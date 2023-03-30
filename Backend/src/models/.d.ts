import {Document} from 'mongoose';

import IContact from "./Contact/.d";
import IUser from "./User/.d";

export interface ICompany extends Document {
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
  contacts: IContact[];
  user: IUser;
}
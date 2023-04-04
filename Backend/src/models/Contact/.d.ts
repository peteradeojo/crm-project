import { Document, PopulatedDoc } from "mongoose";
import IUser from "../User/";

/** 
 store and organize information about your customers or clients, including their contact details, company information, and any interactions or transactions they've had with your business
*/
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

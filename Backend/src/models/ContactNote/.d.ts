import { Document, PopulatedDoc, ObjectId } from "mongoose";

/**
 * Contact notes contain more information about a contact. More descriptive useful information.
 */
export default interface IContactNote extends Document {
  title: string;
  body: string;
  contact: ObjectId;
}

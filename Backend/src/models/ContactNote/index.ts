import mongoose, { Schema } from "mongoose";
import IContactNote from "./.d";

const contactNoteSchema = new Schema<IContactNote>(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    contact: {
      type: Schema.Types.ObjectId,
      ref: "Contact",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ContactNote = mongoose.model<IContactNote>("ContactNote", contactNoteSchema);

export default ContactNote;

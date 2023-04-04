import mongoose, { Schema } from "mongoose";
import IContact from "./.d";
import ContactNote from "../ContactNote";

const contactSchema = new Schema<IContact>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: false,
    },
    tel: {
      work: [
        {
          type: String,
          required: false,
        },
      ],
      home: [
        {
          type: String,
          required: false,
        },
      ],
      mobile: [
        {
          type: String,
          required: false,
        },
      ],
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      zip: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

contactSchema.virtual("notes", {
  ref: "ContactNote",
  localField: "_id",
  foreignField: "contact",
  justOne: false,
});

const Contact = mongoose.model<IContact>("Contact", contactSchema);
export default Contact;

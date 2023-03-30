import mongoose, { Schema } from 'mongoose';
import IContact from './.d';

const contactSchema = new Schema<IContact>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  tel: {
    work: [{
      type: String,
      required: false,
    }],
    home: [{
      type: String,
      required: false,
    }],
    mobile: [{
      type: String,
      required: false,
    }],
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
    ref: 'User',
    required: true,
  },
}, {
  timestamps: true,
});

const Contact = mongoose.model<IContact>('Contact', contactSchema);
export default Contact;
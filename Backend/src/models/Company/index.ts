import mongoose, {Schema} from 'mongoose';

import {ICompany} from '../.d';

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: false,
  },
  tel: {
    work: {
      type: [String],
      required: false,
    },
    home: {
      type: [String],
      required: false,
    },
    mobile: {
      type: [String],
      required: false,
    },
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
  contacts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Contact',
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const Company = mongoose.model<ICompany>('Company', companySchema);
export default Company;
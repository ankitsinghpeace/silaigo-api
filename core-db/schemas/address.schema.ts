import { Schema, Types } from 'mongoose';

export const AddressSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: true,
  },
  addressLine1: { type: String },
  addressLine2: { type: String },
  city: { type: String },
  state: { type: String },
  pincode: { type: String },
  isDefault: { type: Boolean, default: false },
});

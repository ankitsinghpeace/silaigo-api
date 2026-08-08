import { Schema, Types } from 'mongoose';
import { AutoIncrementID } from '@typegoose/auto-increment';
import { Gender } from 'core-db/enums/profile.enums';

export interface IProfile {
  _id?: string;
  firstName: string;
  lastName: string;
  gender: string;
  birthDate: Date;
  phone?: string;
  email?: string;
  referralCode?: string;
  referredBy?: string;
  notes?: string;
  createdAt: Date;
  colorCode?: string;
}

export const ProfileSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },

  gender: {
    type: String,
    enum: Object.values(Gender),
    default: Gender.NOT_SPECIFIED,
  },

  birthDate: { type: Date, default: null },

  phone: { type: String },
  email: { type: String },

  referralCode: { type: String }, // Profile's own referral code
  referredBy: { type: String }, // Code used to sign up

  notes: { type: String }, // internal notes (eg. "VIP client", "prefers WhatsApp")
  colorCode: { type: String },

  createdAt: { type: Date, default: Date.now },
});

export { Gender };

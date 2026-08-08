import { Schema, Types } from 'mongoose';
import { PaymentMethodType } from 'core-db/enums';

export const PaymentMethodSchema = new Schema({
  profile: {
    type: Types.ObjectId,
    ref: 'Profile',
    required: true,
  },

  methodType: {
    type: String,
    enum: Object.values(PaymentMethodType), // 'UPI', 'CARD', etc.
    required: true,
  },

  token: {
    type: String,
    required: true, // Razorpay/Stripe token
  },

  cardType: {
    type: String, // e.g. 'VISA', 'MASTERCARD'
    required: false,
  },

  last4: {
    type: String, // Last 4 digits of card
    required: false,
  },

  expiryMonth: {
    type: Number, // e.g. 4 = April
    min: 1,
    max: 12,
    required: false,
  },

  expiryYear: {
    type: Number, // e.g. 2026
    required: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

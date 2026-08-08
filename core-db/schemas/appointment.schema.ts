import { Schema, Types } from 'mongoose';

export const AppointmentSchema = new Schema({
  profile: { type: Types.ObjectId, ref: 'Profile', required: true },
  order: { type: Types.ObjectId, ref: 'Order' },

  date: { type: Date, required: true },
  time: { type: String, required: true }, // "11:00"

  status: {
    type: String,
    enum: ['BOOKED', 'CANCELLED'],
    default: 'BOOKED',
  },

  notes: String,
  createdAt: { type: Date, default: Date.now },
});

AppointmentSchema.index({ date: 1, time: 1 });
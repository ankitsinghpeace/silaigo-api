import { Schema, Types } from 'mongoose';

const PickupOptionSchema = new Schema(
  {
    label: { type: String, required: true },
    type: { type: String, default: 'checkbox' },
    value: { type: Boolean, default: false },
  },
  { _id: false },
);

export const MaterialPickupSchema = new Schema(
  {
    addressLine1: { type: String },
    addressLine2: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: String },
    pickupFor: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String },
    phone: { type: String },
    scheduledPickupDate: {
      type: String,
    },
    scheduledPickupTime: {
      type: String,
    },
    options: {
      type: [PickupOptionSchema],
      default: [
        // { label: 'Leaving workshop to Pick-up order' },
        // { label: 'Reached Customer Location' },
        // { label: 'Measurement & Design Noted' },
        { label: 'Material Picked Up from Customer' },
        { label: 'Material Delivered to Workshop' },
        { label: 'Order fulfilled' },
      ],
    },
    timeline: [
      {
        status: {
          type: String,
          required: true,
        },
        timeStamp: {
          type: Date,
          default: Date.now,
          required: true,
        },
        updatedBy: {
          type: String,
          required: true,
        },
        updatedByUserId: {
          type: Types.ObjectId,
          required: true,
          ref: 'User',
        },
      },
    ],
  },
  { timestamps: true },
);

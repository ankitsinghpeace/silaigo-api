import { Schema, Types } from 'mongoose';

export const OrderMicroEventsSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  roleId: { type: Schema.Types.ObjectId, ref: 'Role', required: true },

  events: [
    {
      status: { type: String, required: true },
      key: { type: String, required: true },
      value: { type: Schema.Types.Mixed },
      timeStamp: { type: Date, default: Date.now },
      updatedBy: { type: String, required: true },
      updatedByUserId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    },
  ],
});

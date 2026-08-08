import { Schema } from 'mongoose';

export const IdentityCountersSchema = new Schema({
  field: { type: String, required: true },
  modelName: { type: String, required: true },
  count: {
    type: Number,
    required: true,
    default: 0,
  },
});
